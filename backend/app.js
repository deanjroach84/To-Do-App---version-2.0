const express = require('express');
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const SECRET = '1l4m1jPD9zcD3Uo2QvVi4BWM2-PNIQdyHdZgMa1KyQ0';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Init SQLite DB
const db = new sqlite3.Database('./db.sqlite');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    text TEXT,
    completed INTEGER
  )`);
});

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hash],
    function (err) {
      if (err) return res.status(400).json({ error: 'User exists' });
      res.json({ success: true });
    }
  );
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Invalid Username' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid Password' });
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET);
    res.json({ token });
  });
});

// Auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
}

// ToDo CRUD
app.get('/api/todos', auth, (req, res) => {
  db.all('SELECT * FROM todos WHERE userId = ?', [req.userId], (err, rows) => {
    res.json(rows);
  });
});

app.post('/api/todos', auth, (req, res) => {
  db.run(
    'INSERT INTO todos (userId, text, completed) VALUES (?, ?, ?)',
    [req.userId, req.body.text, 0],
    function (err) {
      res.json({ id: this.lastID, text: req.body.text, completed: 0 });
    }
  );
});

app.put('/api/todos/:id', auth, (req, res) => {
  db.run(
    'UPDATE todos SET text = ?, completed = ? WHERE id = ? AND userId = ?',
    [req.body.text, req.body.completed, req.params.id, req.userId],
    function (err) {
      res.json({ success: true });
    }
  );
});

app.delete('/api/todos/:id', auth, (req, res) => {
  db.run('DELETE FROM todos WHERE id = ? AND userId = ?', [req.params.id, req.userId], function (err) {
    res.json({ success: true });
  });
});

app.listen(4000, () => console.log(`API running on ${API_BASE_URL}`));
