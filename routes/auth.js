const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = require('../middleware/auth');

const router = express.Router();

let users = []; // In-memory users

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash });
  res.status(201).json({ message: 'User created' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.sendStatus(401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.sendStatus(403);

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
