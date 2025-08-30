const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

/**
 * POST /api/auth/register
 * body: { name, accountNumber, email, password }
 */
router.post('/register', async (req, res) => {
  try {
    const { name, accountNumber, email, password } = req.body;
    if (!name || !accountNumber || !email || !password) {
      return res.status(400).json({ msg: 'Please provide all fields' });
    }

    // unique checks
    const existsAcc = await User.findOne({ accountNumber });
    if (existsAcc) return res.status(400).json({ msg: 'Account number already exists' });

    const existsEmail = await User.findOne({ email });
    if (existsEmail) return res.status(400).json({ msg: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, accountNumber, email, password: hashed });
    await user.save();

    // sign token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: user.toJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * POST /api/auth/login
 * body: { email, password } (or accountNumber + password if you prefer)
 */
router.post('/login', async (req, res) => {
  try {
    const { accountNumber, password } = req.body;
    console.log("🟢 Login attempt:", accountNumber);

    // find by accountNumber
    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials - user not found' });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials - wrong password' });
    }

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      msg: 'Login successful',
      token,
      user: { id: user._id, name: user.name, balance: user.balance }
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
