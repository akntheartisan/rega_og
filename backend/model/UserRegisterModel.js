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
      trackId:{
        type:String,
      },
      invoice:{
        type:String,
      }
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
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
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
    passwordResetExpiresAt: Number,

    Purchased: [PurchasedItems],
  },
  { timestamps: true }
);

UserRegister.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

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
