const nodemailer = require('nodemailer');

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aravinthkumaran410@gmail.com',
      pass: 'aioy tkzr gazv atah',
    },
  });

  const mailOptions = {
    from: 'aravinthkumaran410@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  
  console.log(mailOptions);
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;