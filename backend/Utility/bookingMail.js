const nodemailer = require("nodemailer");
const path = require("path");
// const hbs = require("nodemailer-express-handlebars");

const sendBookMail = async (options) => {
  console.log("options", options);
  const { default: hbs } = await import("nodemailer-express-handlebars");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aravinthkumaran410@gmail.com",
      pass: "aioy tkzr gazv atah",
    },
  });

  //telling Nodemailer to use Handlebars templates when sending emails.
  const hbsOptions = {
    viewEngine: {
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../views"),
    extName: ".handlebars",
  };

  //transporter.use(...): Adds middleware to Nodemailer
  transporter.use("compile", hbs(hbsOptions));

  const mailOptions = {
    from: "aravinthkumaran410@gmail.com",
    to: options.email,
    subject:"Order Confirmation mail",
    template: "booking",
    context: {
      name: options.name,
      total: options.total,
      paidAmount: options.paidAmount ? options.paidAmount : "-",
      paymentId: options.paymentId ? options.paymentId : "-",
      order: options.cartData.map((each) => ({
        productName: each.model,
        batteryType: each.subModelDetails.battery,
        color: each.color,
        quantity: each.quantity,
      })),
    },
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendBookMail;

// Nodemailer on its own doesn't understand .handlebars. So you add this middleware to:
// Tell it how to compile templates
// Where to find them
// What file extension to expect
