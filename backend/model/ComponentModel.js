const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  image: {
    type: Object,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('component', componentSchema);
