const express = require('express')
const router = express.Router()
const controller = require("../controller/webhookController")

router.post('/notification',controller.notification)


module.exports = router