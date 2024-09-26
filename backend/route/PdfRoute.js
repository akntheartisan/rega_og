const express = require('express');
const router = express.Router();
const cont = require('../controller/PdfController');

router.get('/downloads',cont.pdfDownloads);
module.exports = router;

