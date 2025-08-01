const multer = require("multer");
const cloudinary = require("../Cloud/Cloudinary");
const sharp = require("sharp");
const streamifier = require("streamifier");
const componentModel = require("../model/ComponentModel");

const multerConfig = multer({
  storage: multer.memoryStorage(),
});

exports.fileUpload = multerConfig.single("image");

exports.fileExtension = async (req, res, next) => {
  console.log("componentFile:", req.file);

  try {
    const imageExt = {
      originalName: req.file.originalname,
      buffer: await sharp(req.file.buffer).toFormat("png").toBuffer(),
    };

    req.fileBuffer = imageExt;
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.fileSave = async (req, res, next) => {
  console.log(req.fileBuffer);

  const fileName = `${Date.now()}_${req.fileBuffer.originalName}`;
  console.log(fileName);

  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "rega_component_image",
        public_id: fileName,
        resource_type: "auto",
        format: "png",
      },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);

          req.result = result;
          next();
        }
      }
    );

    streamifier.createReadStream(req.fileBuffer.buffer).pipe(stream);
  } catch (error) {
    console.log(error);
  }
};

exports.componentSave = async (req, res) => {
  const { image, name, price, description } = req.body;
  console.log(req.result);

  const { secure_url, public_id } = req.result;
  const imageObj = { secure_url, public_id };
  try {
    const componentSaveResponse = await componentModel.create({
      image: imageObj,
      name,
      price,
      description,
    });

    if (componentSaveResponse) {
      res.status(200).json({
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.componentRead = async (req, res) => {
  try {
    const readResponse = await componentModel.find();

    console.log(readResponse);

    if (readResponse) {
      res.status(200).json({
        readResponse,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.componentDelete = async (req, res) => {
  const { publicId, imageId } = req.body;
  console.log(req.body);
  

  try {
    const cloudDelete = await cloudinary.uploader.destroy(publicId, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("deleteResult", result);

        return result;
      }
    });

    console.log(cloudDelete);

    if(cloudDelete.result === 'ok'){
      const deleteComponent = await componentModel.findByIdAndDelete(imageId)
      console.log(deleteComponent);

      if(deleteComponent){
        res.status(200).json({message:'success'})
      }
      
    }
  } catch (error) {
    console.log(error);
  }
};
