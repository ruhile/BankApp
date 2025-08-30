const express = require('express');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const router = express.Router();

/**
 * GET /api/transactions/me
 * Get current user's transactions by accountNumber (protected)
 */
router.get('/me', auth, async (req, res) => {
  try {
    const txns = await Transaction.find({ accountNumber: req.user.accountNumber })
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(txns);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * POST /api/transactions/credit
 * body: { amount, note }
 */
router.post('/credit', auth, async (req, res) => {
  try {
    const { amount, note } = req.body;
    const amt = Number(amount);
    if (!amt || amt <= 0) return res.status(400).json({ msg: 'Invalid amount' });

    // Find user by accountNumber
    const user = await User.findOne({ accountNumber: req.user.accountNumber });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.balance = (user.balance || 0) + amt;
    await user.save();

    const txn = new Transaction({
      accountNumber: user.accountNumber,
      type: 'credit',
      amount: amt,
      balanceAfter: user.balance,
      note
    });
    await txn.save();

    res.json({ msg: 'Credited', balance: user.balance, txn });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * POST /api/transactions/debit
 * body: { amount, note }
 */
router.post('/debit', auth, async (req, res) => {
  try {
    const { amount, note } = req.body;
    const amt = Number(amount);
    if (!amt || amt <= 0) return res.status(400).json({ msg: 'Invalid amount' });

    const user = await User.findOne({ accountNumber: req.user.accountNumber });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if ((user.balance || 0) < amt) {
      return res.status(400).json({ msg: 'Insufficient funds' });
    }

    user.balance -= amt;
    await user.save();

    const txn = new Transaction({
      accountNumber: user.accountNumber,
      type: 'debit',
      amount: amt,
      balanceAfter: user.balance,
      note
    });
    await txn.save();

    res.json({ msg: 'Debited', balance: user.balance, txn });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;