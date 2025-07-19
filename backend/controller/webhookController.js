const express = require("express");
const userModel = require("../model/UserRegisterModel");
const nodemailer = require("nodemailer");

exports.notification = async (req, res) => {
  console.log("refundnofification", JSON.stringify(req.body));

  const webHookObj = req.body

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aravinthkumaran410@gmail.com",
        pass: "aioy tkzr gazv atah",
      },
    });

    const mailOptions = {
      from: "aravinthkumaran410@gmail.com",
      to: "aravinthkumaran410@gmail.com",
      subject: "webhooks works perfectly",
      text: webHookObj,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    
  }
};
