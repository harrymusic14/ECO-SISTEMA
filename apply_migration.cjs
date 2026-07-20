const { Client } = require('pg');
const fs = require('fs');

const envPath = process.argv[2];
const sqlPath = process.argv[3];

const raw = fs.readFileSync(envPath, 'utf-8');
const env = {};
raw.split('\n').forEach(line => {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim();
});

const sql = fs.readFileSync(sqlPath, 'utf-8');

const client = new Client({
  host: env.SUPABASE_DB_HOST,
  port: parseInt(env.SUPABASE_DB_PORT, 10),
  database: env.SUPABASE_DB_NAME,
  user: env.SUPABASE_DB_USER,
  password: env.SUPABASE_DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

(async () => {
  try {
    await client.connect();
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log('=== MIGRACION APLICADA OK (commit) ===');
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('ERROR - ROLLBACK aplicado, nada quedo a medias:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();
