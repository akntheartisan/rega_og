const mongoose = require("mongoose");
const usermodel = require("../model/AdminLoginModel");
const sendMail = require("../Utility/Mail");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

exports.forgotpassword = async (req, res, next) => {
    const { mail } = req.body;
    console.log(mail);
  
    try {
      const user = await usermodel.findOne({ username: mail });
      console.log(user);
  
      if (!user) {
        res.status(402).json({
          status: "fail",
          message: "there is no user for this mail",
        });
      }
  
      const resetToken = user.createPasswordResetToken();
      console.log(resetToken);

      
      await user.save({ validateBeforeSave: false });
  
      const url = `http://localhost:5173/admin/resetPassword/${resetToken}`;
      const message = `this is the password reset link ${url} /n click here.`;
  
      await sendMail({
        email: user.username,
        subject: "your password reset message",
        message: message,
      });
  
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  exports.resetpassword = async (req, res) => {
    const { password, resetToken } = req.body;
    console.log(password, resetToken);
  
    const encryptedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    try {
      const user = await usermodel.findOne({
        passwordResetToken: encryptedToken,
        passwordResetExpiresAt: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({
          status: 'fail',
          message: 'Invalid or expired token',
        });
      }
  
      user.password = password; 
      user.passwordResetToken = undefined; // Clear reset token
      user.passwordResetExpiresAt = undefined; // Clear expiration
      await user.save();
  
      res.status(200).json({
        status: 'success',
        message: 'Password has been successfully reset',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Server error',
      });
    }
  }