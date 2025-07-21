const express = require("express");
const userModel = require("../model/UserRegisterModel");
const nodemailer = require("nodemailer");
const refundModel = require("../model/RefundDataModel");
const crypto = require("crypto");

exports.notification = async (req, res) => {
  console.log("refundnofification", JSON.stringify(req.body));

  const webhookObject = req.body;
  const body = JSON.stringify(req.body);
  const receivedSignature = req.headers["x-razorpay-signature"];
  const secretKey = "rega-refund-webhook";

  const expectedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(body)
    .digest("hex");

  if (receivedSignature === expectedSignature) {
    res.status(200).send("Webhook verified");
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
        text: JSON.stringify(req.headers),
      };

      await transporter.sendMail(mailOptions);

      const refundDetails = await refundModel.create({
        refundAmount:
          webhookObject.payload.payment.entity.amount_refunded / 100,
        paymentId: webhookObject.payload.refund.entity.payment_id,
        refundId: webhookObject.payload.refund.entity.id,
        currency: webhookObject.payload.refund.entity.currency,
        refundStatus: webhookObject.payload.payment.entity.status,
        createdAt: new Date(webhookObject.created_at * 1000).toDateString(),
        arn: webhookObject.payload.refund.entity.acquirer_data?.arn || null,
        method: webhookObject.payload.payment.entity.method,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(403).send("Invalid signature");
  }
};

exports.refundDetails = async (req, res) => {
  try {
    const refundDetails = await refundModel.find();
    console.log(refundDetails);

    if (refundDetails) {
      res.status(200).json({ message: "success", refundDetails });
    }
  } catch (error) {
    console.log();
  }
};
