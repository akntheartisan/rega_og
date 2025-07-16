const mongoose = require("mongoose");

const PurchasedItems = new mongoose.Schema(
  {
    total: {
      type: Number,
    },
    paidAmount: {
      type: Number,
    },
    cartData: {
      type: Array,
      deliverystatus: {
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

const Cart = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userregister",
    },
    Purchased: [PurchasedItems],
    // total: {
    //   type: String,
    // },
    // deliverystatus: {
    //   type: String,
    // },
    // order_id:{
    //   type:String,
    // },
    // payment_id:{
    //   type:String,
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("cartdetails", Cart);
