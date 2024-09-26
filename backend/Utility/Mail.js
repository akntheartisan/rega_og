const nodemailer = require('nodemailer');

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mkansha2312@gmail.com',
      pass: 'trjt drjf qquv ozvl',
    },
  });

  const mailOptions = {
    from: 'mkansha2312@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  
  console.log(mailOptions);
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;