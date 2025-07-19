const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
  refundAmount: Number,
  paymentId: String,
  refundId: String,
  currency: String,
  refundStatus: String,
  createdAt: Date,
  arn: String,
  email: String,
  contact: String,
  method: String,
  walletOrCard: String,
});


module.exports = mongoose.model('refund',refundSchema)