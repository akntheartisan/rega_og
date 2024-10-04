const express = require("express");
const router = express.Router();
const prodcont = require("../controller/ProductAddController");


router.post(
  "/primary",
  prodcont.uploadFile,
  prodcont.resizeImage,
  prodcont.saveImage,
  prodcont.savePrimary
);

router.get("/getPrimary", prodcont.getPrimary);

router.post(
  "/productadd",
  prodcont.productadd
);

router.get("/getproduct", prodcont.getProduct);
router.post("/updateproject", prodcont.updateProject);
router.post("/deleteproduct", prodcont.deleteProduct);

router.delete("/deleteprimary/:id", prodcont.deletePrimaryProduct);

// Update primary product route with multer for image upload
router.put('/updateprimary/:id', 
  prodcont.uploadFile,
  prodcont.resizeImage,
  prodcont.saveImage,
  prodcont.updatePrimaryProduct);


module.exports = router;
