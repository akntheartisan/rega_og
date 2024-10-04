const express = require('express');
const router = express.Router();
const enquiryController = require('../controller/EnquiryController');

// Route to create a new enquiry
router.post('/enquiries', enquiryController.createEnquiry);
router.get('/getenquiries', enquiryController.getEnquiries);
router.delete('/deleteenquiries', enquiryController.deleteEnquiry);



module.exports = router;
