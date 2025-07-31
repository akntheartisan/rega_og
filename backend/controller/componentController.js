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

  const { asset_id, secure_url } = req.result;
  const imageObj = { asset_id, secure_url };
  try {
    const componentSaveResponse = await componentModel.create({
      image: imageObj,
      name,
      price,
      description,
    });
  } catch (error) {
    console.log(error);
  }
};
