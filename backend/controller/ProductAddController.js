const projectmodel = require("../model/ProductsModel");
const Cloudinary = require("../Cloud/Cloudinary");
const streamifier = require("streamifier");
const sharp = require("sharp");
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

exports.uploadFile = upload.array("image");

exports.resizeImage = async (req, res, next) => {
  if (!req.files) {
    console.log("No image provided, skipping resize");
    return next();
  }

  try {
    req.filesBuffer = await Promise.all(
      req.files.map(async (file) => {
        return {
          originalname: file.originalname,
          buffer: await sharp(file.buffer).toFormat("png").toBuffer(),
        };
      })
    );

    console.log("resize image");

    next();
  } catch (err) {
    res.status(500).json({ message: "Error resizing image" });
  }
};

exports.saveImage = async (req, res, next) => {
  if (!req.filesBuffer) {
    console.log("No image buffer, skipping saveImage");
    return next();
  }

  console.log("upload all images to cloudinary");

  try {
    const uploadPromises = req.filesBuffer.map(({ buffer, originalname }) => {
      return new Promise((resolve, reject) => {
        const fileName = `scooter_${Date.now()}_${
          originalname.split(".")[0]
        }.png`;

        const stream = Cloudinary.uploader.upload_stream(
          {
            folder: "scooter_image",
            public_id: fileName,
            resource_type: "auto",
            format: "png",
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );

        streamifier.createReadStream(buffer).pipe(stream);
        // console.log('stream completed');
      });
    });

    const results = await Promise.all(uploadPromises);
    console.log(results);
    req.uploadResults = results;
    next();
  } catch (err) {
    res.status(500).json({ message: "Error saving image" });
  }
};

exports.savePrimary = async (req, res, next) => {
  const { model } = req.body;
  const modelLowerCase = model.toLowerCase();
  console.log(req.uploadResults);

  const images = req.uploadResults.map((eachUploadResult) => ({
    url: eachUploadResult.url,
    pid: eachUploadResult.public_id,
  }));

  try {
    const newModel = await projectmodel.create({
      model: modelLowerCase,
      image: images,
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

  // console.log(charging);

  try {
    let findModel = await projectmodel.find({ model });
    if (findModel) {
      const projectSubModel = await projectmodel.updateOne(
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
              chargingtime: charging,
              frame,
              price,
            },
          },
        }
      );

      if (projectSubModel) {
        res.status(200).json({
          message: "success",
        });
      }
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
    // const primary = await projectmodel.find();
    // console.log(primary);

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

exports.getSelected = async (req, res, next) => {
  console.log("selectedproduct");

  const { id } = req.query;
  // console.log(id);

  try {
    let selected = await projectmodel.findById(id);

    if (selected) {
      return res.status(200).json({
        status: "success",
        selected,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateProject = async (req, res) => {
  // console.log("this update get triggered");
  const { updatedProduct, id } = req.body;
  // console.log(updatedProduct, id);

  try {
    const updatedDoc = await projectmodel.updateOne(
      { _id: id, "SubModel._id": updatedProduct._id },
      { $set: { "SubModel.$": updatedProduct } }
    );

    // console.log(updatedDoc);
    if (updatedDoc) {
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

exports.deletePrimaryProduct = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const deletedProduct = await projectmodel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the product",
    });
  }
};

exports.updatePrimaryProduct = async (req, res, next) => {
  const { id } = req.params;
  const { model } = req.body;
  const hasImage = req.uploadResults;
  console.log("primary product image update:", hasImage);

  try {
    const currentProduct = await projectmodel.findById(id);

    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!model && !hasImage) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const image = hasImage.map((eachImg) => {

      return ({ url: eachImg.url, pid: eachImg.public_id });
    });

    console.log(image);
    

    const productUpdate = await projectmodel.findByIdAndUpdate(
      id,
      { model: model.toLowerCase(), image: image },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      productUpdate,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
};
