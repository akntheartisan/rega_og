const mongoose = require("mongoose");
const bucketmodel = require("../model/BuckerListModel");
const projectmodel = require("../model/ProductsModel");

exports.addBucket = async (req, res) => {
  console.log(req.body);
  const { userId, model, modelId } = req.body;
  try {
    const addBucket = await bucketmodel.updateOne(
      { _id: userId },

      {
        $push: {
          list: {
            model: model,
            subModelId: modelId,
          },
        },
      },
      { upsert: true }
    );

    console.log(addBucket);
  } catch (error) {
    console.log(error);
  }
};

exports.getBucket = async (req, res) => {
  // console.log(req.query);

  const { id } = req.query;

  try {
    const getBucket = await bucketmodel.findById(id);
    console.log(getBucket.list);

    const result = await bucketmodel.aggregate([
      // Unwind the array of objects
      //this line unwind the list array in bucketcollection
      { $unwind: "$list" },
      // Perform the lookup to join with the product collection
      {
        $lookup: {
          //this product is product collection
          from: "products",
          //save the submodel id and model name from bucket collection in submodelId and modelName variable
          let: { subModelId: "$list.subModelId", modelName: "$list.model" },
          pipeline: [
            //unwind the SubModel array in product collection
            { $unwind: "$SubModel" },
            
            {
              $match: {
                //$expr allows you to compare fields within the same document or use variables inside $match.
                $expr: {
                  //and operator
                  $and: [
                    //match the variables value and actual value in product collection to get the matched value
                    { $eq: ["$SubModel._id", "$$subModelId"] },
                    { $eq: ["$model", "$$modelName"] },
                  ],
                },
              },
            },

            //If removing/renaming fields → ✅ $project (reshape the result)
            //If adding new fields without removing others → ✅ $addFields
            //If removing specific fields → ✅ $unset

            //from the answer 0- unneccasary, 1- neccasary, change the iamge url into image
            { $project: { _id: 0, image: "$image.url", SubModel: 1 } },
          ],
          as: "productDetails",
        },
      },
      // Reshape the documents

      {
        $project: {
          model: "$list.model",
          image: { $arrayElemAt: ["$productDetails.image", 0] },
          subModelDetails: { $arrayElemAt: ["$productDetails.SubModel", 0] },
        },
      },
    ]);

    console.log("aggregate result:",result);

    if (result) {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteBucket = async (req, res) => {
  console.log("deletebucket"); 
  const { id, userId } = req.body; 
  console.log(id, userId);

  try {
    const userBucket = await bucketmodel.findOneAndUpdate(
      { _id: userId },
      { $pull: { list: { subModelId: id } } },
      {new:true}
    );
     console.log(userBucket);
    return res.status(200).json({
      message:'bucket item deleted',
    });
  } catch (error) {
    console.log(error);
  }
};
