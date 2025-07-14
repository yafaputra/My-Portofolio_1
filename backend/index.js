const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');
const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.get('/api/education', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM education ORDER BY period DESC;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Gagal mengambil data pendidikan', details: error.message });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM skills;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Gagal mengambil data skill', details: error.message });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM projects;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Gagal mengambil data proyek', details: error.message });
  }
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

module.exports = app;

