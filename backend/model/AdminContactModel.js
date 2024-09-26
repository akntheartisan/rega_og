const mongoose = require('mongoose');
const validator = require('validator');

const AdminContactSchema = new mongoose.Schema({
    shopaddress: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    shopmobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        validate: {
            validator: function(value) {
                return validator.isMobilePhone(value, 'any', { strictMode: false });
            },
            message: 'Please enter a valid mobile number'
        }
    },
    shopemail: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: 'Please enter a valid email'
        }
    },
    shophours: {
        type: String, // Changed from array to string
        required: [true, 'Shop hours are required'],
        trim: true
    }
});

module.exports = mongoose.model('AdminContact', AdminContactSchema);
