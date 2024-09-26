const projectmodel = require("../model/ProductsModel");
const Cloudinary = require("../Cloud/Cloudinary");
const streamifier = require("streamifier");
const sharp = require("sharp");
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

exports.uploadFile = upload.single("image");

exports.resizeImage = async (req, res, next) => {
  //console.log("resizeimage controller");
  try {
    //console.log("Original File Size:", req.file.size);
    req.fileBuffer = await sharp(req.file.buffer).toFormat("png").toBuffer();
    //console.log("Resized File Buffer Size:", req.fileBuffer.length);
    next();
  } catch (err) {
    //console.log("Error resizing image:", err);
    res.status(500).json({ message: "Error resizing image" });
  }
};

exports.saveImage = async (req, res, next) => {
  //console.log("saveimage controller");
  try {
    const fileName = `scooter_${Date.now()}.png`;
    const Stream = Cloudinary.uploader.upload_stream(
      {
        folder: "scooter_image",
        public_id: fileName,
        resource_type: "auto",
        format: "png",
      },
      (err, result) => {
        if (err) {
          //console.log("Error uploading to Cloudinary:", err);
          return res.status(404).json({ message: "Cannot save image" });
        } else {
          console.log("Upload result:", result);
          req.result = result;
          next();
        }
      }
    );
    streamifier.createReadStream(req.fileBuffer).pipe(Stream);
  } catch (err) {
    //console.log("Error in saveImage:", err);
    res.status(500).json({ message: "Error saving image" });
  }
};

exports.savePrimary = async (req, res, next) => {
  const { model } = req.body;
  const { url, public_id } = req.result;
  const modelLowerCase = model.toLowerCase();

  try {
    const newModel = await projectmodel.create({
      model: modelLowerCase,
      image: { url: url, pid: public_id },
    });
    if (newModel) {
      res.status(200).json({
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.productadd = async (req, res, next) => {
  const {
    model,
    motor,
    battery,
    range,
    tyresize,
    brakes,
    ground,
    payload,
    charging,
    frame,
    price,
  } = req.body;

  try {
    let findModel = await projectmodel.find({ model });
    if (findModel) {
      await projectmodel.updateOne(
        { model: model },
        {
          $push: {
            SubModel: {
              motor,
              battery,
              range,
              tyresize,
              brakes,
              ground,
              payload,
              charging,
              frame,
              price,
            },
          },
        }
      );
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      status: "fail",
      error: "Something Wrong",
    });
  }
};

exports.getPrimary = async (req, res, next) => {
  try {
    const primary = await projectmodel.distinct("model");
    if (primary) {
      res.status(200).json({
        status: "success",
        data: primary,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    let data = await projectmodel.find();

    if (data) {
      return res.status(200).json({
        status: "success",
        data: data,
      });
    }
  } catch (error) {
    //console.log(error);
  }
};

// exports.updateProject = async (req, res) => {
//   //console.log("this update get triggered");
//   const id = req.body._id;
// console.log(id);

//   try {
//     let updateProduct = await projectmodel.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     console.log(updateProduct);
//     // if (updateProduct) {
//     //   return res.status(200).json({
//     //     status: "success",
//     //     message: "Updated successfully",
//     //     data: updateProduct,
//     //   });
//     // } else {
//     //   return res.status(404).json({
//     //     status: "fail",
//     //     message: "Product not found",
//     //   });
//     // }
//   } catch (error) {
//     //console.log(error);
//   }
// };
exports.updateProject = async (req, res) => {
  //console.log("this update get triggered");
  const { updatedProduct, id } = req.body;
  console.log(updatedProduct, id);

  try {
    const updatedDoc = await projectmodel.updateOne(
      { _id: id, "SubModel._id": updatedProduct._id },
      { $set: { "SubModel.$": updatedProduct } }
    );

    console.log(updatedDoc);
    if(updatedDoc){
      return res.status(200).json({
        status: "success",
        message: "Updated successfully",
      });
    }
    
  } catch (error) {
    console.log(error);
  }
};



exports.deleteProduct = async (req, res) => {
  //console.log(req.body.id);
  try {
    let deleteProduct = await projectmodel.findByIdAndDelete(req.body.id);
    if (deleteProduct) {
      return res.status(200).json({
        status: "success",
        message: "Deleted successfully",
      });
    }
  } catch (error) {
    //console.log(error);
  }
};
