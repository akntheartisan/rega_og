const PDFDocument = require("pdfkit");

function generateInvoice(user,cartData,dataCallback, endCallback) {
  const doc = new PDFDocument({ margin: 50 });

  
  
const {name,address,district,landmark,mobile,pincode,state} = user;
const{model,subModelDetails,quantity,cartId,invoice} = cartData;

console.log('pdfservice',invoice,mobile);
  // Stream PDF data
  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  // Add Invoice Title
  doc.fontSize(17).text("Invoice", { align: 'center' });
  
  // Add some spacing
  doc.moveDown(5);

  //
  doc
  .fontSize(12)
  .text(`Sold By :`, 50, 100)
  .fontSize(11)
  .text(`Rega Scooter`,108,100) 
  .moveDown(1)
  .fontSize(12)  
  .text(`Order Id :`, 50, 120)
  .fontSize(11)
  .text(`${cartId}`,108,120) 
  .moveDown(1)
  .fontSize(12)  
  .text(`Invoice No :`, 50, 140)
  .fontSize(11)
  .text(`${invoice}`,122,140)  

  // Customer Information
  doc
  .fontSize(12)
  .text('Bill To :-', 320, 100,)
  .moveDown(2)
  .fontSize(11)
  .text(`${name}`, 320, 120)  // This will place the name at y = 100
  .moveDown(1)  // Moves down one line (adjust this number as necessary)
  .text(`${address}`, 320, 135)  // Address starts at y = 115
  .moveDown(1)  // Another line break if needed
  .text(`${district}, ${state}, pincode - ${pincode}`, 320, 150)
  .moveDown(1)  // Another line break if needed
  .text(`Mobile - ${mobile}`, 320, 165);  // District, state, and pincode on the next line


  // Add some spacing
  doc.moveDown();

  // Invoice Table Header
  doc
    .fontSize(12)
    .text("Product Name", 50, 200)
    .text("Order Date", 150, 200)
    .text("Battery", 250, 200)
    .text("Quantity", 350, 200)
    .text("Amount", 450, 200);

  doc.moveTo(50, 220).lineTo(550, 220).stroke();

  // Add Invoice Table Rows
  doc
  .fontSize(12)
  .text(`${model}`, 50, 230)
  .text(`${model}`, 150, 230)
  .text(`${subModelDetails.battery}`, 250, 230)
  .text(`${quantity}`, 350, 230)
  .text(`Rs.${subModelDetails.price}`, 450, 230);  // Use the Unicode rupee symbol directly

  doc.moveTo(50, 250).lineTo(550, 250).stroke();
  

  // Total Amount
  doc.moveDown().fontSize(14).text(`Total:Rs.${subModelDetails.price}`,410,270);

  doc.moveDown(8).fontSize(12).text(`Authorized Signatory`,{align:'right'});

  

  // Footer
  // doc.moveDown().fontSize(10).text("Thank you for your business!", { align: 'center' });

  // Finalize the PDF and end the stream
  doc.end();
}

module.exports = { generateInvoice };
