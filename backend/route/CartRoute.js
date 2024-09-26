const express = require('express');
const router = express.Router();
const cont = require('../controller/CartController')


router.post('/addCart',cont.addCart,cont.deleteCartData);
router.post('/verify',cont.verify);
router.get('/getCart',cont.getCart);
router.post('/addCartOnline',cont.addCartOnline); 

module.exports = router;