require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function migrate() {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(schema);
  await pool.end();
  console.log('Database schema is ready.');
}

migrate().catch((error) => {
  console.error(error);
  process.exit(1);
});
