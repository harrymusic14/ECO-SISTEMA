const { Client } = require('pg');
const fs = require('fs');

const envPath = process.argv[2];
const raw = fs.readFileSync(envPath, 'utf-8');
const env = {};
raw.split('\n').forEach(line => {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim();
});

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
    console.log('=== CONEXION OK ===\n');

    const version = await client.query('select version();');
    console.log('Version Postgres:', version.rows[0].version, '\n');

    const tables = await client.query(`
      select table_name
      from information_schema.tables
      where table_schema = 'public'
      order by table_name;
    `);
    console.log('=== TABLAS EN public ===');
    console.log(tables.rows.map(r => r.table_name), '\n');

    for (const { table_name } of tables.rows) {
      const cols = await client.query(`
        select column_name, data_type, is_nullable, column_default
        from information_schema.columns
        where table_schema = 'public' and table_name = $1
        order by ordinal_position;
      `, [table_name]);
      console.log(`--- columnas de "${table_name}" ---`);
      cols.rows.forEach(c => {
        console.log(`  ${c.column_name}: ${c.data_type} ${c.is_nullable === 'NO' ? 'NOT NULL' : ''} ${c.column_default ? 'DEFAULT ' + c.column_default : ''}`.trim());
      });
      console.log('');
    }

    console.log('=== ROW COUNTS ===');
    for (const { table_name } of tables.rows) {
      const c = await client.query(`select count(*)::int as n from "${table_name}";`);
      console.log(`  ${table_name}: ${c.rows[0].n} filas`);
    }
    console.log('');

    const policies = await client.query(`
      select schemaname, tablename, policyname, cmd, roles, permissive
      from pg_policies
      where schemaname in ('public', 'storage')
      order by schemaname, tablename, policyname;
    `);
    console.log('=== POLITICAS RLS (public + storage) ===');
    if (policies.rows.length === 0) {
      console.log('  (ninguna política encontrada)');
    } else {
      policies.rows.forEach(p => {
        console.log(`  [${p.schemaname}.${p.tablename}] "${p.policyname}" cmd=${p.cmd} roles=${p.roles} permissive=${p.permissive}`);
      });
    }
    console.log('');

    const rls = await client.query(`
      select relname, relrowsecurity, relforcerowsecurity
      from pg_class
      join pg_namespace on pg_namespace.oid = pg_class.relnamespace
      where pg_namespace.nspname = 'public' and relkind = 'r'
      order by relname;
    `);
    console.log('=== RLS HABILITADO POR TABLA (public) ===');
    rls.rows.forEach(r => {
      console.log(`  ${r.relname}: rowsecurity=${r.relrowsecurity} forced=${r.relforcerowsecurity}`);
    });
    console.log('');

    const buckets = await client.query(`
      select id, name, public, file_size_limit, allowed_mime_types
      from storage.buckets
      order by name;
    `);
    console.log('=== BUCKETS DE STORAGE ===');
    buckets.rows.forEach(b => {
      console.log(`  ${b.name} (id=${b.id}) public=${b.public} limit=${b.file_size_limit} mime=${JSON.stringify(b.allowed_mime_types)}`);
    });

  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    await client.end();
  }
})();
