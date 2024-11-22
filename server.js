// app.js
require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router"); 
const contactRoute=require("./router/contact-router")
const connectDb=require("./utils/db");
const errorMiddleware=require("./midlewares/error-middleware")
// const authRouter = require("./router/auth-router"); 
// const contactRoute=require("./router/contact-router")
 // Importing the auth router
//const errorMiddleware = require("./midlewares/error-middleware");
app.use(express.json());
app.use("/", authRouter);  // Apply the router to the root URL
app.use("/",contactRoute);
app.use(errorMiddleware)
const PORT = process.env.PORT || 1000;
connectDb().then(()=>{
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
});
