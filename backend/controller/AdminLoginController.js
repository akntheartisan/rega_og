const mongoose = require("mongoose");
const adminmodel = require("../model/AdminLoginModel");
const jwt = require("jsonwebtoken");
exports.adminsignin = async (req, res, next) => {
  //console.log(req.body);
  try {
    const { username, password } = req.body;
    //console.log(username, password);

    if (!username || !password) {
      console.log("no admin password");

      return res.status(400).json({
        status: "fail",
        message: "Username and Password are required",
      });
    }

    const adminCheck = await adminmodel
      .findOne({ username })
      .select("+password");
    //console.log(adminCheck);

    const dbPassword = adminCheck.password;

    if (!adminCheck) {
      return res.status(404).json({
        status: "fail",
        error: "Invalid Username, Please try again",
      });
    } else if (dbPassword !== password) {
      return res.status(401).json({
        status: "fail",
        error: "Incorrect password. Please try again",
      });
    } else {
      const jwtSecret = "sdflkjsadlfhasldfjsdlk";
      const jwtExpiration = "30d";

      const token = jwt.sign({ id: adminCheck._id }, jwtSecret, {
        expiresIn: jwtExpiration,
      });

      const cookieOptions = {
        httpOnly: true,secure:true,sameSite:"none" 
      };

      res.cookie("jwt", token, cookieOptions).status(200).json({
        status: "success",
        message: "Successfully logged in",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(302).json({
      status: "error",
    });
  }
};

exports.protect = async (req, res, next) => {
  //console.log("thisismwtriggered");

  // 1) Get the token from the cookies
  let token;
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
    //console.log("protecttoken:" + token);
  } else {
    return res.status(401).json({
      status: "fail",
      message: "Not authenticated",
    });
  }

  // 2) Verify token
  const jwtSecret = "sdflkjsadlfhasldfjsdlk";
  try {
    const decoded = jwt.verify(token, jwtSecret);
    //console.log(decoded.id);

    // 3) Check if user still exists
    const adminCheck = await adminmodel.findById(decoded.id);
    if (!adminCheck) {
      return res.status(401).json({
        status: "fail",
        message: "This user no longer exists",
      });
    }

    //console.log(adminCheck);

    req.user = adminCheck;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Token expired or invalid. Please log in again",
    });
  }
};

exports.passwordUpdate = async (req, res) => {
  //console.log("passwordupdate executed");
  try {
    const { password, confirm, id } = req.body;
    //console.log(id, password, confirm);

    if (password !== confirm) {
      return res.status(400).json({
        status: "failed",
        error: "passwords do not match",
      });
    }

    const adminCheck = await adminmodel.findById(id);

    adminCheck.password = password;
    const passwordChange = await adminCheck.save();

    if (passwordChange) {
      return res.status(200).json({
        status: "success",
      });
    }
  } catch (error) {
    //console.log(error);
  }
};

exports.logout = async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(0),
    httpOnly: true,
    sameSite:'none',
    secure:true,  
  };

  res.cookie("jwt", "", cookieOptions).status(200).json({
    status: "success",
    message: "Successfully logged in",
  });
};
