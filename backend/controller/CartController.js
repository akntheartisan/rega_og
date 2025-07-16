const mongoose = require("mongoose");
const cartmodel = require("../model/CartModel");
const usermodel = require("../model/UserRegisterModel");
const productmodel = require("../model/ProductsModel");
const bucketmodel = require("../model/BuckerListModel");
const razorpay = require("razorpay");
const crypto = require("crypto");
// const { stat } = require("fs");
const bookingMail = require("../Utility/bookingMail");

exports.addCart = async (req, res, next) => {
  const { userId } = req.body.userDetails;

  const { cartData, total, paymentMode } = req.body;

  console.log('cartData',cartData);
  

  const deliverystatus = "Not Delivered";

  try {
    if (paymentMode === "offline") {
      console.log("offline");

      const orderPlace = await cartmodel.updateOne(
        { _id: userId },
        {
          $push: {
            Purchased: {
              total,
              cartData: cartData.map((item) => ({
                ...item,
                deliverystatus: deliverystatus,
                cartId: new mongoose.Types.ObjectId(),
              })),
            },
          },
        },
        { upsert: true }
      );

      const findUser = await usermodel.findById(userId);

      if (findUser) {
     await usermodel.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              Purchased: {
                total,
                cartData: cartData.map((item) => ({
                  ...item,
                  deliverystatus: deliverystatus,
                  cartId: new mongoose.Types.ObjectId(),
                })),
              },
            },
          },
          { new: true }
        );
      }
      let bookingDetails = {cartData,name:findUser.name,email:findUser.username}

      console.log(bookingDetails);
      

      await bookingMail(bookingDetails);

      res.json({
        success: "offline order success",
        message: "offline",
      });
    } else if (paymentMode === "online") {
      const razorPayInstance = new razorpay({
        key_id: "rzp_test_ooBBvuCJO2yhPh",
        key_secret: "Sza1b1bUrEAKO4ITERLLVGYi",
      });

      const options = {
        amount: 15000 * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };

      razorPayInstance.orders.create(options, (err, order) => {
        if (err) {
          // console.log(err.error.description);
          return res.status(500).json({ error: "Amount exceed" });
        } else {
          return res
            .status(200)
            .json({ success: "verification success", transaction: order });
        }
      });
    } else if (paymentMode === "partial") {
      const razorPayInstance = new razorpay({
        key_id: "rzp_test_ooBBvuCJO2yhPh",
        key_secret: "Sza1b1bUrEAKO4ITERLLVGYi",
      });

      const options = {
        amount: 10000 * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };

      razorPayInstance.orders.create(options, (err, order) => {
        if (err) {
          // console.log(err.error.description);
          return res.status(500).json({ error: "Amount exceed" });
        } else {
          return res
            .status(200)
            .json({ success: "verification success", transaction: order });
        }
      });
    }

    req.userId = userId;
    console.log("req.userId set in addCart:", req.userId);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCartData = async (req, res) => {
  const userId = req.userId;
  console.log("User ID:", userId);
  try {
    const deleteCartData = await bucketmodel.updateOne(
      { _id: userId },
      { $set: { list: [] } }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.verify = async (req, res) => {
  console.log("verify:");
  console.log(req.body);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "Sza1b1bUrEAKO4ITERLLVGYi")
      .update(sign.toString())
      .digest("hex");

    console.log(razorpay_signature, expectedSign);

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment Verified Sucessfully" });
    } else {
      return res.status(400).json({ message: "Invalid Signature" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addCartOnline = async (req, res, next) => {
  console.log("addCartOnline:", req.body);
  const { userId } = req.body.userDetails;

  const { cartData, total, order_id, payment_id, paidAmount } = req.body;

  const deliverystatus = "Not Delivered";
  try {
    const orderPlace = await cartmodel.updateOne(
      { _id: userId },
      {
        $push: {
          PurchasedData: {
            total,
            paidAmount: paidAmount / 100,
            deliverystatus: deliverystatus,
            cartData: cartData.map((item) => ({
              ...item,
              deliverystatus: deliverystatus,
              cartId: new mongoose.Types.ObjectId(),
            })),
          },
        },
      },
      { upsert: true }
    );

    const findUser = await usermodel.findById(userId);
    console.log(findUser);
    if (findUser) {
      const addPurchasedItem = await usermodel.updateOne(
        { _id: userId },
        {
          $push: {
            Purchased: {
              total,
              paidAmount: paidAmount / 100,
              deliverystatus: deliverystatus,
              cartData: cartData.map((item) => ({
                ...item,
                deliverystatus: deliverystatus,
                cartId: new mongoose.Types.ObjectId(),
              })),
              order_id,
              payment_id,
            },
          },
        }
      );

      if (addPurchasedItem) {
        console.log("return addpurchaseditem");

        return res.status(200).json({
          status: "success",
          message: "Order has been placed successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  console.log("getcart");

  try {
    const cart = await usermodel.find();
    console.log(cart);

    if (cart) {
      return res.status(200).json({
        status: "success",
        data: cart,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
