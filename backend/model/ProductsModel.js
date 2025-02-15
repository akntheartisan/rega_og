const mongoose = require("mongoose");

const SubProduct = new mongoose.Schema(
  {
    battery: {
      type: String,
    },
    motor: {
      type: String,
    },
    range: {
      type: String,
    },
    tyresize: {
      type: String,
    },
    brakes: {
      type: String,
    },
    ground: {
      type: String,
    },
    payload: {
      type: String,
    },
    chargingtime: {
      type: String,
    },
    frame: {
      type: String,
    },
    price: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      get: (val) => Math.round(val * 10) / 10,
    },
  },
  { _id: true }
);

const ProductSchema = new mongoose.Schema(
  {
    image: [
      {
        url: {
          type: String,
        },
        pid: {
          type: String,
        },
      },
    ],
    model: {
      type: String,
    },
    SubModel: [SubProduct],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
