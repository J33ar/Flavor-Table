const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const bcrypt = require('bcrypt');
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// GET /api/users/profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const { userId } = req.user; 

    const result = await pool.query(
      'SELECT id, username, email FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// put /api/users/profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { username, email, password } = req.body;

    const check = await pool.query(
      'SELECT * FROM users WHERE (email = $1 OR username = $2) AND id != $3',
      [email, username, userId]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already in use' });
    }

    let hashedPassword = null;
    if (password && password.trim() !== '') {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    let result;
    if (hashedPassword) {
      result = await pool.query(
        `UPDATE users
         SET username = $1, email = $2, password = $3
         WHERE id = $4
         RETURNING id, username, email`,
        [username, email, hashedPassword, userId]
      );
    } else {
      result = await pool.query(
        `UPDATE users
         SET username = $1, email = $2
         WHERE id = $3
         RETURNING id, username, email`,
        [username, email, userId]
      );
    }

    res.status(200).json({ message: 'Profile updated', user: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});





module.exports = router;