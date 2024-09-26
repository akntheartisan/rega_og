// controllers/ratingController.js
const Product = require('../model/ProductsModel'); // Ensure this path is correct

// exports.submitRating = async (req, res) => {
//   const { model, battery, rating } = req.body;

//   // Validate rating
//   if (rating === undefined || isNaN(Number(rating)) || rating < 0 || rating > 5) {
//     return res.status(400).json({ message: "Invalid rating value provided" });
//   }

//   const parsedRating = Number(rating);

//   try {
//     // Find the product and the specific SubModel
//     const product = await Product.findOne(
//       { "model": model, "SubModel.battery": battery },
//       { "SubModel.$": 1 }  // Get the specific SubModel that matches the query
//     );

//     if (!product) {
//       return res.status(404).json({ message: "Product or SubModel not found" });
//     }

//     const subProduct = product.SubModel[0]; 

//     if (!subProduct) {
//       return res.status(404).json({ message: "SubProduct not found" });
//     }

//     // Calculate the new rating and update count
//     const totalRatings = subProduct.count * subProduct.rating;
//     const updatedCount = subProduct.count + 1;
//     const updatedRating = (totalRatings + parsedRating) / updatedCount;

//     // Update the SubModel in the database
//     const result = await Product.updateOne(
//       { "model": model, "SubModel.battery": battery },
//       {
//         $set: {
//           "SubModel.$.count": updatedCount,
//           "SubModel.$.rating": Math.round(updatedRating * 10) / 10 // Round to 1 decimal place
//         }
//       }
//     );

//     if (result.modifiedCount === 0) {
//       return res.status(404).json({ message: "SubModel not updated" });
//     }

//     // Retrieve the updated SubModel to return
//     const updatedProduct = await Product.findOne(
//       { "model": model, "SubModel.battery": battery },
//       { "SubModel.$": 1 }
//     );

//     const updatedSubProduct = updatedProduct ? updatedProduct.SubModel[0] : null;

//     return res.status(200).json({
//       message: "Rating submitted successfully",
//       updatedSubProduct: updatedSubProduct
//     });
//   } catch (error) {
//     console.error("Error submitting rating:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };
exports.submitRating = async (req, res) => {
  const { model, battery, rating } = req.body;

  // Validate rating
  if (rating === undefined || isNaN(Number(rating)) || rating < 0 || rating > 5) {
    return res.status(400).json({ message: "Invalid rating value provided" });
  }

  const parsedRating = Number(rating);

  try {
    // Find the product and the specific SubModel
    const product = await Product.findOne(
      { "model": model, "SubModel.battery": battery },
      { "SubModel.$": 1 }  
    );

    if (!product) {
      return res.status(404).json({ message: "Product or SubModel not found" });
    }

    const subProduct = product.SubModel[0]; 

    if (!subProduct) {
      return res.status(404).json({ message: "SubProduct not found" });
    }

    // Calculate the new rating and update count
    const totalRatings = subProduct.count * subProduct.rating;
    const updatedCount = subProduct.count + 1;
    const updatedRating = (totalRatings + parsedRating) / updatedCount;

    
    const result = await Product.updateOne(
      { "model": model, "SubModel.battery": battery },
      {
        $set: {
          "SubModel.$.count": updatedCount,
          "SubModel.$.rating": parseFloat(updatedRating.toFixed(1)) // Round to 1 decimal place
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "SubModel not updated" });
    }

    // Retrieve the updated SubModel to return
    const updatedProduct = await Product.findOne(
      { "model": model, "SubModel.battery": battery },
      { "SubModel.$": 1 }
    );

    const updatedSubProduct = updatedProduct ? updatedProduct.SubModel[0] : null;

    return res.status(200).json({
      message: "Rating submitted successfully",
      updatedSubProduct: updatedSubProduct
    });
  } catch (error) {
    console.error("Error submitting rating:", error);
    return res.status(500).json({ message: error.message });
  }
};
