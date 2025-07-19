const express = require('express')
const router = express.Router()
const controller = require("../controller/webhookController")

router.post('/notification',controller.notification)
router.get('/getDetails',controller.refundDetails)


module.exports = router