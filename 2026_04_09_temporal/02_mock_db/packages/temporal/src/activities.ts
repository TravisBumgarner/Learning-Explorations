import db from './db';

type Email = { id: string; message: string };

export async function checkDB(): Promise<Email | null> {
  const result = await db.query<Email>(
    'SELECT id, message FROM emails WHERE is_sent = false LIMIT 1'
  );
  return result.rows[0] ?? null;
}

export async function sendEmail(id: string, message: string): Promise<void> {
  console.log(`Sending email: ${message}`);
  await db.query('UPDATE emails SET is_sent = true WHERE id = $1', [id]);
}
