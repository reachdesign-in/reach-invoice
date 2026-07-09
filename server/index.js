require('dotenv').config();

const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { pool } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-before-production';
const COLLECTIONS = ['clients', 'services', 'quotations', 'invoices', 'payments', 'projects', 'expenses', 'activities'];
const SINGLETONS = ['companySettings'];

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
app.use(express.json({ limit: '25mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 800 }));
app.use(express.static(path.join(__dirname, '..')));

function signUser(user) {
  return jwt.sign({
    userId: user.id,
    organizationId: user.organization_id,
    email: user.email,
    role: user.role
  }, JWT_SECRET, { expiresIn: '7d' });
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function requireAuth(req, res, next) {
  try {
    const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

function publicUser(user) {
  return { id: user.id, email: user.email, organizationId: user.organization_id, role: user.role };
}

function validateCollection(key) {
  if (!COLLECTIONS.includes(key)) {
    const error = new Error('Invalid data collection');
    error.status = 400;
    throw error;
  }
}

async function getAppState(organizationId) {
  const state = Object.fromEntries(COLLECTIONS.map((key) => [key, []]));
  const records = await pool.query(
    'SELECT collection_key, data FROM app_records WHERE organization_id = $1 ORDER BY collection_key, updated_at DESC',
    [organizationId]
  );
  for (const row of records.rows) state[row.collection_key].push(row.data);

  const singletons = await pool.query(
    'SELECT singleton_key, data FROM app_singletons WHERE organization_id = $1',
    [organizationId]
  );
  for (const row of singletons.rows) state[row.singleton_key] = row.data;
  return state;
}

async function replaceCollection(client, organizationId, key, rows = []) {
  validateCollection(key);
  const safeRows = Array.isArray(rows) ? rows : [];
  const seenNumbers = new Set();
  for (const item of safeRows) {
    if ((key === 'invoices' || key === 'quotations') && item?.number) {
      const number = String(item.number).trim().toLowerCase();
      if (seenNumbers.has(number)) throw Object.assign(new Error(`Duplicate ${key.slice(0, -1)} number ${item.number}`), { status: 409 });
      seenNumbers.add(number);
    }
  }
  await client.query('DELETE FROM app_records WHERE organization_id = $1 AND collection_key = $2', [organizationId, key]);
  for (const row of safeRows) {
    const record = { ...row, id: row.id || crypto.randomUUID() };
    await client.query(
      `INSERT INTO app_records (organization_id, collection_key, record_id, data)
       VALUES ($1, $2, $3, $4::jsonb)
       ON CONFLICT (organization_id, collection_key, record_id)
       DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
      [organizationId, key, record.id, JSON.stringify(record)]
    );
  }
}

async function setSingleton(client, organizationId, key, data) {
  if (!SINGLETONS.includes(key)) throw Object.assign(new Error('Invalid settings key'), { status: 400 });
  await client.query(
    `INSERT INTO app_singletons (organization_id, singleton_key, data)
     VALUES ($1, $2, $3::jsonb)
     ON CONFLICT (organization_id, singleton_key)
     DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [organizationId, key, JSON.stringify(data || {})]
  );
}

app.post('/api/auth/register', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || '');
  const companyName = String(req.body.companyName || 'REACH Design').trim();
  if (!email || !email.includes('@')) return res.status(400).json({ message: 'Valid email is required' });
  if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const org = await client.query('INSERT INTO organizations (name) VALUES ($1) RETURNING *', [companyName]);
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await client.query(
      'INSERT INTO users (organization_id, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [org.rows[0].id, email, passwordHash]
    );
    await setSingleton(client, org.rows[0].id, 'companySettings', { companyName });
    await client.query('COMMIT');
    res.json({ token: signUser(user.rows[0]), user: publicUser(user.rows[0]) });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(error.code === '23505' ? 409 : 500).json({ message: error.code === '23505' ? 'Email already exists' : 'Registration failed' });
  } finally {
    client.release();
  }
});

app.post('/api/auth/login', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || '');
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({ token: signUser(user), user: publicUser(user) });
});

app.post('/api/auth/forgot-password', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  await pool.query(
    "UPDATE users SET reset_token_hash = $1, reset_token_expires_at = now() + interval '30 minutes' WHERE email = $2",
    [tokenHash, email]
  );
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Password reset token for ${email}: ${token}`);
  }
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, async (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/app-state', requireAuth, async (req, res) => {
  res.json(await getAppState(req.user.organizationId));
});

app.put('/api/app-state/:key', requireAuth, async (req, res) => {
  const key = req.params.key;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    if (SINGLETONS.includes(key)) await setSingleton(client, req.user.organizationId, key, req.body.data);
    else await replaceCollection(client, req.user.organizationId, key, req.body.data);
    await client.query('COMMIT');
    res.json({ ok: true });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(error.status || 500).json({ message: error.message || 'Save failed' });
  } finally {
    client.release();
  }
});

app.post('/api/app-state/import', requireAuth, async (req, res) => {
  const backup = req.body || {};
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const key of COLLECTIONS) await replaceCollection(client, req.user.organizationId, key, backup[key] || []);
    await setSingleton(client, req.user.organizationId, 'companySettings', backup.companySettings || {});
    await client.query('COMMIT');
    res.json({ ok: true });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(error.status || 500).json({ message: error.message || 'Import failed' });
  } finally {
    client.release();
  }
});

app.post('/api/app-state/reset', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM app_records WHERE organization_id = $1', [req.user.organizationId]);
  await pool.query('DELETE FROM app_singletons WHERE organization_id = $1', [req.user.organizationId]);
  res.json({ ok: true });
});

app.get('/api/records/:key', requireAuth, async (req, res) => {
  try {
    validateCollection(req.params.key);
    const limit = Math.min(Number(req.query.limit || 50), 200);
    const offset = Math.max(Number(req.query.offset || 0), 0);
    const search = String(req.query.search || '').trim();
    const status = String(req.query.status || '').trim();
    const values = [req.user.organizationId, req.params.key, limit, offset];
    const clauses = ['organization_id = $1', 'collection_key = $2'];
    if (search) {
      values.push(`%${search.toLowerCase()}%`);
      clauses.push(`lower(data::text) LIKE $${values.length}`);
    }
    if (status) {
      values.push(status);
      clauses.push(`data->>'status' = $${values.length}`);
    }
    const sql = `SELECT data FROM app_records WHERE ${clauses.join(' AND ')} ORDER BY updated_at DESC LIMIT $3 OFFSET $4`;
    const rows = await pool.query(sql, values);
    res.json({ rows: rows.rows.map((row) => row.data), limit, offset });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Records failed' });
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`REACH INVOICE online server running on port ${PORT}`);
});
