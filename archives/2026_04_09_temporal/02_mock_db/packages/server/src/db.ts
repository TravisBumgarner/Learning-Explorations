import { Pool } from 'pg';

const db = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'user',
  password: 'password',
  database: 'app',
});

export default db;
