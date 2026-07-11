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
const COLLECTIONS = ['clients', 'services', 'quotations', 'invoices', 'payments', 'projects', 'expenses', 'activities', 'trash'];
const SINGLETONS = ['companySettings'];
const ADMIN_EMAILS = String(process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => normalizeEmail(email))
  .filter(Boolean);

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
    role: user.role,
    isPlatformAdmin: isPlatformAdmin(user.email)
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

function isPlatformAdmin(email) {
  return ADMIN_EMAILS.includes(normalizeEmail(email));
}

function requirePlatformAdmin(req, res, next) {
  if (!req.user?.isPlatformAdmin && !isPlatformAdmin(req.user?.email)) return res.status(403).json({ message: 'Admin access required' });
  next();
}

async function requireActiveOrganization(req, res, next) {
  try {
    const result = await pool.query('SELECT status, trial_ends_at, subscription_ends_at FROM organizations WHERE id = $1', [req.user.organizationId]);
    if (!accountIsAllowed(result.rows[0])) {
      return res.status(403).json({ message: 'Account trial expired or disabled. Please contact support.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Account check failed' });
  }
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    organizationId: user.organization_id,
    role: user.role,
    emailVerified: !!user.email_verified,
    isPlatformAdmin: isPlatformAdmin(user.email),
    organization: user.organization_name ? {
      name: user.organization_name,
      status: user.organization_status,
      plan: user.organization_plan,
      trialEndsAt: user.trial_ends_at,
      subscriptionEndsAt: user.subscription_ends_at
    } : undefined
  };
}

function accountIsAllowed(org) {
  if (!org) return false;
  if (org.status === 'suspended' || org.status === 'disabled') return false;
  if (org.status === 'trial' && org.trial_ends_at && new Date(org.trial_ends_at).getTime() < Date.now()) return false;
  if (org.subscription_ends_at && new Date(org.subscription_ends_at).getTime() < Date.now()) return false;
  if (org.status === 'expired') return false;
  return true;
}

async function getUserWithOrganization(email) {
  const result = await pool.query(
    `SELECT users.*, organizations.name AS organization_name, organizations.status AS organization_status,
            organizations.plan AS organization_plan, organizations.trial_ends_at, organizations.subscription_ends_at
     FROM users
     JOIN organizations ON organizations.id = users.organization_id
     WHERE users.email = $1`,
    [email]
  );
  return result.rows[0];
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
    const org = await client.query(
      "INSERT INTO organizations (name, status, plan, trial_ends_at) VALUES ($1, 'trial', 'trial', now() + interval '14 days') RETURNING *",
      [companyName]
    );
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await client.query(
      'INSERT INTO users (organization_id, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [org.rows[0].id, email, passwordHash]
    );
    await setSingleton(client, org.rows[0].id, 'companySettings', { companyName });
    await client.query('COMMIT');
    res.json({
      token: signUser(user.rows[0]),
      user: publicUser({
        ...user.rows[0],
        organization_name: org.rows[0].name,
        organization_status: org.rows[0].status,
        organization_plan: org.rows[0].plan,
        trial_ends_at: org.rows[0].trial_ends_at,
        subscription_ends_at: org.rows[0].subscription_ends_at
      })
    });
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
  const user = await getUserWithOrganization(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (!accountIsAllowed({ status: user.organization_status, trial_ends_at: user.trial_ends_at, subscription_ends_at: user.subscription_ends_at })) {
    return res.status(403).json({ message: 'Account trial expired or disabled. Please contact support.' });
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
  const user = await getUserWithOrganization(req.user.email);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user: publicUser(user) });
});

app.get('/api/admin/tenants', requireAuth, requirePlatformAdmin, async (req, res) => {
  const result = await pool.query(
    `SELECT organizations.id, organizations.name, organizations.status, organizations.plan,
            organizations.trial_ends_at, organizations.subscription_ends_at, organizations.created_at,
            users.email AS owner_email,
            COUNT(app_records.record_id)::int AS record_count
     FROM organizations
     LEFT JOIN users ON users.organization_id = organizations.id AND users.role = 'owner'
     LEFT JOIN app_records ON app_records.organization_id = organizations.id
     GROUP BY organizations.id, users.email
     ORDER BY organizations.created_at DESC`
  );
  res.json({ tenants: result.rows });
});

app.patch('/api/admin/tenants/:id', requireAuth, requirePlatformAdmin, async (req, res) => {
  const allowedStatuses = ['trial', 'active', 'suspended', 'disabled', 'expired'];
  const allowedPlans = ['trial', 'basic', 'pro', 'enterprise'];
  const status = String(req.body.status || '').trim();
  const plan = String(req.body.plan || '').trim();
  if (!allowedStatuses.includes(status)) return res.status(400).json({ message: 'Invalid account status' });
  if (!allowedPlans.includes(plan)) return res.status(400).json({ message: 'Invalid plan' });
  const trialEndsAt = req.body.trialEndsAt || null;
  const subscriptionEndsAt = req.body.subscriptionEndsAt || null;
  const result = await pool.query(
    `UPDATE organizations
     SET status = $1, plan = $2, trial_ends_at = COALESCE($3::timestamptz, trial_ends_at),
         subscription_ends_at = $4::timestamptz, updated_at = now()
     WHERE id = $5
     RETURNING id, name, status, plan, trial_ends_at, subscription_ends_at, created_at`,
    [status, plan, trialEndsAt, subscriptionEndsAt, req.params.id]
  );
  if (!result.rows[0]) return res.status(404).json({ message: 'Tenant not found' });
  res.json({ tenant: result.rows[0] });
});

app.get('/api/app-state', requireAuth, requireActiveOrganization, async (req, res) => {
  res.json(await getAppState(req.user.organizationId));
});

app.put('/api/app-state/:key', requireAuth, requireActiveOrganization, async (req, res) => {
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

app.post('/api/app-state/import', requireAuth, requireActiveOrganization, async (req, res) => {
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

app.post('/api/app-state/reset', requireAuth, requireActiveOrganization, async (req, res) => {
  await pool.query('DELETE FROM app_records WHERE organization_id = $1', [req.user.organizationId]);
  await pool.query('DELETE FROM app_singletons WHERE organization_id = $1', [req.user.organizationId]);
  res.json({ ok: true });
});

app.get('/api/records/:key', requireAuth, requireActiveOrganization, async (req, res) => {
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
