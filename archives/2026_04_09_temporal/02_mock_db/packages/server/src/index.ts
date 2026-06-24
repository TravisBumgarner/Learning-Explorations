import express from 'express';
import db from './db';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.post('/emails', async (req, res) => {
  const { message } = req.body;
  const result = await db.query(
    'INSERT INTO emails (message) VALUES ($1) RETURNING *',
    [message]
  );
  res.status(201).json(result.rows[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
