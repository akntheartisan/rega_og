const express = require('express')
const userModel = require('../model/UserRegisterModel')

exports.notification = async(req,res)=>{
    console.log('refundnofification',JSON.stringify(req.body));
    
}