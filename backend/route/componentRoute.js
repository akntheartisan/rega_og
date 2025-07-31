const express = require("express");
const route = express.Router();
const cont = require("../controller/componentController");

route.post(
  "/postComponent",
  cont.fileUpload,
  cont.fileExtension,
  cont.fileSave,
  cont.componentSave
);


module.exports = route