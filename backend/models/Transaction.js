const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true }, // store acc number
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  balanceAfter: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);