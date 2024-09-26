const mongoose = require("mongoose");


const UserLogin = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("userregister", UserLogin);
