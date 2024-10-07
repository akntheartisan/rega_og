const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const AdminLoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpiresAt: {
    type: Date,
  },
});

// Method to create a password reset token
AdminLoginSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000; 

  return resetToken;
};


AdminLoginSchema.methods.correctPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

AdminLoginSchema.methods.resetPassword = async function (newPassword) {
  this.password = await bcrypt.hash(newPassword, 12); 
  this.passwordResetToken = undefined;
  this.passwordResetExpiresAt = undefined;
};

module.exports = mongoose.model('Admin', AdminLoginSchema);
