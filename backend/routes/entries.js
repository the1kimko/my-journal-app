const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
let entries = []; // In-memory journal entries

// Get all entries for logged-in user
router.get('/', authenticateToken, (req, res) => {
  const userEntries = entries.filter(e => e.username === req.user.username);
  res.json(userEntries);
});

// Add a new entry
router.post('/', authenticateToken, (req, res) => {
  const newEntry = {
    id: Date.now(),
    username: req.user.username,
    title: req.body.title,
    content: req.body.content,
    date: new Date().toISOString()
  };
  entries.push(newEntry);
  res.status(201).json(newEntry);
});

// Update an entry
router.put('/:id', authenticateToken, (req, res) => {
  const entry = entries.find(e => e.id == req.params.id && e.username === req.user.username);
  if (!entry) return res.sendStatus(404);

  entry.title = req.body.title;
  entry.content = req.body.content;
  res.json(entry);
});

// Delete an entry
router.delete('/:id', authenticateToken, (req, res) => {
  entries = entries.filter(e => !(e.id == req.params.id && e.username === req.user.username));
  res.sendStatus(204);
});

module.exports = router;
