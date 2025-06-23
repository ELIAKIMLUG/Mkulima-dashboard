const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mkulima',
  password: 'dio',
  port: 5432,
});

// API endpoint to return user data
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT name, email, phone, role FROM public.users ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Make sure the port number below matches the one you're actually using
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
