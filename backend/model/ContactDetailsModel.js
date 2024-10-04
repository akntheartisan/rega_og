// models/contactModel.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
