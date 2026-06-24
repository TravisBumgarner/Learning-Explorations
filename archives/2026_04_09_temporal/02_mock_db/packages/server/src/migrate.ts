import { readFileSync } from 'fs';
import { join } from 'path';
import db from './db';

async function migrate() {
  const files = ['001_create_emails.sql'];

  for (const file of files) {
    const sql = readFileSync(join(__dirname, '../migrations', file), 'utf8');
    await db.query(sql);
    console.log(`Ran migration: ${file}`);
  }

  await db.end();
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
