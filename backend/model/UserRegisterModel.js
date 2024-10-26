const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const PurchasedItems = new mongoose.Schema(
  {
    total: {
      type: String,
    },
    cartData: {
      type: Array,
      deliverystatus: {
        type: String,
      },
      trackId: {
        type: String,
      },
      invoice: {
        type: String,
      },
    },
    order_id: {
      type: String,
    },
    payment_id: {
      type: String,
    },
  },
  { _id: true }
);

const UserRegister = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    active:{
      type:Boolean
    },
    mobile: {
      type: String,
    },
    address: {
      type: String,
    },
    landmark: {
      type: String,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    otp:{
      type:String
    },
    otpExpiresAt:{
      type:Number
    },
    passwordResetExpiresAt: Number,

    

    Purchased: [PurchasedItems],
  },
  { timestamps: true }
);

// UserRegister.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// UserRegister.pre("save", async function (next) {
//   if (this.isNew) {
//     this.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000).getTime();
//   }
//   next();
// });

UserRegister.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpiresAt = new Date(Date.now() + 10 * 60 * 1000).getTime();

  return resetToken;
};



module.exports = mongoose.model("userregister", UserRegister);
