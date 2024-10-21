const mongoose = require("mongoose");
const usermodel = require("../model/UserRegisterModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "fhsdkfhksdhfjksdhfkjsdhiy";
const JWT_EXPIRATION = "1m";
const sendMail = require("../Utility/Mail");
const crypto = require("crypto");
const { isErrored } = require("stream");

let otpCheck;

usermodel.createIndexes({ username: 1 });
usermodel.createIndexes({ passwordResetToken: 1 });

exports.userOTP = async (req, res, next) => {
  console.log("otp method");

  console.log(req.body);

  const { name, username, password, confirmpassword } = req.body;

  console.log(username);

  try {
    const exist = await usermodel.findOne({ username });

    console.log(exist);

    if (exist) {
      return res.status(400).json({
        status: "fail",
        error: "Username has already been registered",
      });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);

    //const otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiration

    console.log("beforeusercreate");

    const newuser = await usermodel.create({
      username,
      otp: otp,
      //otpExpiresAt,
    });

    console.log("afterusercreate");

    if (newuser) {
      const message = `Your 4 digit otp is ${otp}`;

      await sendMail({
        email: username,
        subject: "Your SignUp OTP",
        message: message,
      });

      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userSignUp = async (req, res, next) => {
  console.log("user creation method");

  const { name, username, password, confirmpassword, userOTP } = req.body;
  console.log(userOTP);
  try {
    const existingUser = await usermodel.findOne({
      username,
    });

    console.log(existingUser.otp);

    if (!existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid User",
      });
    }

    if (existingUser.otp == userOTP) {
      existingUser.name = name;
      existingUser.password = await bcrypt.hash(password, 12);
      existingUser.otp = '';
      //existingUser.otpExpiresAt = undefined;
      await existingUser.save();

      const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json({ existingUser });
    } else {
      return res.status(400).json({
        status: "fail",
        message: "Invalid OTP, Try Again",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userSignIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const checkUser = await usermodel.findOne({ username }).select("+password");

    //console.log(checkUser);

    if (username === "" || password === "") {
      return res.status(401).json({
        status: "fail",
        error: "Please fill all fields",
      });
    }

    if (!checkUser) {
      return res.status(400).json({
        status: "fail",
        error: "Username is not registered",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.status(400).json({
        status: "fail",
        error: "Incorrect password.Please try again",
      });
    }

    const token = jwt.sign({ id: checkUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ checkUser });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  //console.log("req.cookies.jwt:", req.cookies.jwt);

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else {
    return res.status(401).json({
      status: "fail",
      message: "Not authenticated",
    });
  }

  try {
    let decoded = jwt.verify(token, JWT_SECRET);

    const checkUser = await usermodel.findById(decoded.id);

    //console.log(checkUser);

    if (!checkUser) {
      return res.status(401).json({
        status: "fail",
        message: "This user is no longer exists",
      });
    }

    req.user = checkUser;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({
      status: "fail",
      message: "Token verification failed",
    });
  }
};

exports.profileUpdate = async (req, res, next) => {
  console.log(req.body);

  const {
    id,
    name,
    username,
    mobile,
    address,
    landmark,
    district,
    state,
    pincode,
  } = req.body;

  try {
    // const exist = await usermodel.findOne({ username });

    // if (exist) {
    //   return res.status(400).json({
    //     status: "fail",
    //     error: "Username has already been registered",
    //   });
    // }

    const profileData = await usermodel.findByIdAndUpdate(
      id,
      { name, username, mobile, address, landmark, district, state, pincode },
      { new: true }
    );
    return res.status(200).json({ profileData });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getProfileData = async (req, res, next) => {
  //console.log(req.query.id);
  try {
    const getProfileData = await usermodel.findById(req.query.id);
    req.profile = getProfileData;
    next();
  } catch (error) {
    //console.log(error);
  }
};

exports.deleteAccount = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const deletedAccount = await usermodel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

exports.forgotpassword = async (req, res, next) => {
  const { mail } = req.body;
  console.log(mail);

  try {
    const user = await usermodel.findOne({ username: mail });
    console.log(user);

    if (!user) {
      res.status(402).json({
        status: "fail",
        message: "there is no user for this mail",
      });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    //const url = `http://localhost:3000/users/resetPassword/${resetToken}`;
    const url = `https://rega-og.vercel.app/users/resetPassword/${resetToken}`;
    const message = `this is the password reset link ${url} /n click here.`;

    await sendMail({
      email: user.username,
      subject: "your password reset message",
      message: message,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { password, resetToken } = req.body;
  console.log(password, resetToken);

  const encryptedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log(encryptedToken);
  try {
    const user = await usermodel.findOne({
      passwordResetToken: encryptedToken,
    });
    console.log("dfsdf", user);

    if (user === null) {
      res.status(404).json({
        status: "failed",
      });
    } else {
      user.password = await bcrypt.hash(password, 12);
      user.passwordResetToken = undefined;
      await user.save();

      res.status(200).json({
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.validateResetToken = async (req, res) => {
  try {
    const { id } = req.params;
    const encryptedToken = crypto.createHash("sha256").update(id).digest("hex");
    const user = await usermodel.findOne({
      passwordResetToken: encryptedToken,
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }
    res.status(200).json({
      message: "Token is valid.",
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getOrderedProducts = async (req, res) => {
  const { id } = req.query;
  console.log(id);

  try {
    const getOrderedProducts = await usermodel.findById(id);
    console.log(getOrderedProducts.Purchased);
    const purchased = getOrderedProducts.Purchased;

    if (getOrderedProducts) {
      res.status(200).json({
        purchased,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.deliveryStatus = async (req, res) => {
  const { user_id, product_id, purchased_id, values } = req.body;
  console.log(user_id, product_id, purchased_id, values);

  try {
    const trackIdValues = Object.values(values);
    const trackId = trackIdValues[0];
    const userId = new mongoose.Types.ObjectId(user_id);
    const purchasedId = new mongoose.Types.ObjectId(purchased_id);
    const productId = new mongoose.Types.ObjectId(product_id);
    const invoice = Math.floor(100000 + Math.random() * 900000);

    const result = await usermodel.updateOne(
      {
        _id: userId,
        "Purchased._id": purchasedId,
        "Purchased.cartData.cartId": productId,
      },
      {
        $set: {
          "Purchased.$[purchase].cartData.$[item].deliverystatus": "Delivered",
          "Purchased.$[purchase].cartData.$[item].trackId": trackId,
          "Purchased.$[purchase].cartData.$[item].invoice": invoice,
        },
      },
      {
        arrayFilters: [
          { "purchase._id": purchasedId },
          { "item.cartId": productId },
        ],
      }
    );

    if (result) {
      return res.status(200).json({
        status: "success",
        message: "Delivered status changed successfully",
      });
    }
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating delivery status." });
  }
};

exports.cancelProducts = async (req, res) => {
  const { id, purchased_id, cartId } = req.body;
  console.log(id, purchased_id, cartId);

  const userId = new mongoose.Types.ObjectId(id);
  const purchaseId = new mongoose.Types.ObjectId(purchased_id);
  const cart_Id = new mongoose.Types.ObjectId(cartId);

  try {
    const cancelProduct = await usermodel.findOneAndUpdate(
      {
        _id: id,
        "Purchased._id": purchaseId,
        "Purchased.cartData.cartId": cart_Id,
      },
      {
        $set: {
          "Purchased.$[purchase].cartData.$[cart].deliverystatus": "cancelled",
        },
      },
      {
        arrayFilters: [
          { "purchase._id": purchaseId },
          { "cart.cartId": cart_Id },
        ],
        new: true,
      }
    );

    if (cancelProduct) {
      return res.status(200).json({
        status: "success",
        message: cancelProduct,
      });
    }

    console.log(cancelProduct);
  } catch (error) {}
};
