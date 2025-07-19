const express = require("express");
const userModel = require("../model/UserRegisterModel");
const nodemailer = require("nodemailer");
const refundModel = require("../model/RefundDataModel");

exports.notification = async (req, res) => {
  console.log("refundnofification", JSON.stringify(req.body));

  const webhookObject = req.body;

  try {
    // const refundDetails = await refundModel.create({
    //   refundAmount: webhookObject.payload.payment.entity.amount_refunded,
    //   paymentId: webhookObject.payload.refund.entity.payment_id,
    //   refundId: webhookObject.payload.refund.entity.id,
    //   currency: webhookObject.payload.refund.entity.currency,
    //   refundStatus: webhookObject.payload.payment.entity.status,
    //   createdAt: new Date(webhookObject.createdAt * 1000).toDateString(),
    //   arn: webhookObject.payload.refund.entity.acquirer_data.arn,
    //   method: webhookObject.payload.payment.entity.method,
    // });

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
      text: webhookObject,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
