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

route.get("/getComponent",cont.componentRead)
route.post("/deleteComponent",cont.componentDelete)


module.exports = route