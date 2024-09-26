const mongoose = require("mongoose");
const usermodel = require("../model/UserRegisterModel");
const pdfService = require("../Utility/pdfService");

exports.pdfDownloads = async (req, res, next) => {
  const { id, purchased_id, cartId } = req.query;

  // Log the incoming query params for verification
  console.log("PDF generation started with params:", id, purchased_id, cartId);

  const purachaseId = new mongoose.Types.ObjectId(purchased_id);
  const dbCartId = new mongoose.Types.ObjectId(cartId);
  console.log(purachaseId);
  
  try {

    const user = await usermodel.findById(id);
    console.log(user.Purchased);
    const userPurchased = user.Purchased.find((eachPurchase)=>eachPurchase._id.equals(purachaseId));
    const cartData = userPurchased.cartData.find((eachCartData)=>eachCartData.cartId.equals(dbCartId))
    console.log('userPurchased',cartData);
        
    // Set the response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");

    // Use pdfService to generate the PDF
    pdfService.generateInvoice(
       user,cartData,
      (chunk) => res.write(chunk),  // Write PDF chunk to response stream
      () => {
        res.end();  // End the stream once PDF generation is complete
        console.log("PDF generation complete");
      }
    );
  } catch (error) {
 
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};
