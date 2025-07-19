const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
  refundAmount: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  refundId: {
    type: String,
  },
  currency: {
    type: String,
  },
  refundStatus: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  arn: {
    type: String,
  },
  method: {
    type: String,
  },
});



module.exports = mongoose.model('refund',refundSchema)