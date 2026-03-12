const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

// GET all users (excluding passwords for security)
router.get('/', (req, res) => {
  const sql = "SELECT id, username, role, service_type, createdAt FROM users ORDER BY createdAt DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// UPDATE an existing employee
router.put('/:id', async (req, res) => {
  const { username, password, role, service_type } = req.body;
  const userId = req.params.id;

  try {
    // If the admin typed a new password, update everything including the password
    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = "UPDATE users SET username = ?, password = ?, role = ?, service_type = ? WHERE id = ?";
      db.query(sql, [username, hashedPassword, role, service_type, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Employee updated successfully!" });
      });
      return;
    }

    // If password field is left blank, update everything EXCEPT the password
    const sql = "UPDATE users SET username = ?, role = ?, service_type = ? WHERE id = ?";
    db.query(sql, [username, role, service_type, userId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee updated successfully!" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a user
router.delete('/:id', (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;