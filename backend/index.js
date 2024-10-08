const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const adminroute = require("./route/AdminRoute");
const userroute = require("./route/UserRoute");
const productroute = require("./route/ProductRoute");
const cartroute = require("./route/CartRoute");
const bucketroute = require("./route/BucketRoute");
const pdfdownroute = require("./route/PdfRoute");
const ratingRoute = require("./route/ratingRoute");
const contactroute = require('./route/ContactRoute');
const enquiryRoutes = require('./route/EnquiryRoutes');
const cookieParser = require("cookie-parser");
// const pdfdownroute= require("./route/pdfRoute");
// const ratingRoute = require("./route/ratingRoute")

app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

const allowedOrigins = ["https://rega-og.vercel.app", "https://rega-og-admin.vercel.app"];

const corsOptions = {
  origin: (origin, callback) => {
    
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

//routes
app.get('/',(req,res)=>{
  res.send('hi')
  
});
app.use("/admin", adminroute);
app.use("/project", productroute);
app.use("/user", userroute);
app.use("/cart", cartroute);
app.use("/bucket", bucketroute);
app.use("/pdfdown", pdfdownroute);
app.use('/contact', contactroute);
app.use('/enquiryUser', enquiryRoutes);
app.use("/rating", ratingRoute);
const mongo_uri =
  "mongodb+srv://aravinthkumaran410:iRPBg1ArJBqv3ayN@cluster0.2eiliwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongo_uri)
  .then(() => {
    app.listen(4000, () => {
      console.log(`listening to 4000`);
    });
  })
  .catch((err) => console.log(err));
