const express = require('express');
const router = express.Router();
const cont = require('../controller/AdminLoginController');
const cont1 = require('../controller/AdminAuthController');
const cont2 = require('../controller/AdminContactController');



router.post('/signin',cont.adminsignin);
router.get('/authuser',cont.protect,(req,res)=>{
    res.status(200).json({
        status:'success',
        user:req.user
    });
});

router.post('/passwordupdate',cont.passwordUpdate);
router.post('/forgotpassword', cont1.forgotpassword);
router.post('/resetpassword', cont1.resetpassword);

router.get('/shopcontact',cont2.getAdminContact);
router.get('/fetchuser',cont2.getLoginUser);
router.put('/shopcontact', cont2.updateAdminContact);
router.post('/logout',cont.logout);

module.exports = router;