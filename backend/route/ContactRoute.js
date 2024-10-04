const express = require('express');
const router = express.Router();
const contactController = require('../controller/ContactDetailController');

// Route to get contact details
router.get('/contactdetails', contactController.getAdminContact);

module.exports = router;
