const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
    address:{
        type:String
    },
    mobile:{
        type:String
    },
    email:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('contact',Contact);