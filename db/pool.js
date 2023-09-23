const { Pool } = require('pg-promise');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'prograde_dev',
  port: 5432,
});

module.exports = pool;
