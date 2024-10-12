const express = require("express");
const router = express.Router();
const cont = require("../controller/UserAuthController");


router.post("/userOTP",cont.userOTP);
router.post("/usersignup", cont.userSignUp);
router.post("/signin", cont.userSignIn);
router.post("/profileupdate", cont.profileUpdate);
router.get("/protect", cont.protect, (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

router.get("/getprofiledata", cont.getProfileData, (req, res) => {
  res.status(200).json({
    status: "success",
    profile: req.profile,
  });
});

router.post('/logout', (req, res) => {
  res.cookie('token', '', { 
    httpOnly: true,
    sameSite:'none',
    secure:true,  
    expires: new Date(0) // Setting the cookie expiration date to a past date
  });
  res.status(200).send({ message: 'Logged out successfully' });
});

router.post("/deleteAccount", cont.deleteAccount);

router.post("/forgotpassword", cont.forgotpassword);
router.post("/resetPassword", cont.resetPassword);
router.get("/getOrderedProducts", cont.getOrderedProducts);
router.post("/delivery", cont.deliveryStatus);
router.post("/cancelProducts", cont.cancelProducts);

module.exports = router;
