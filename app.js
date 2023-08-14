//npm i express dotenv ejs mongoose multer cookie-parser express-validator jsonwebtoken bcrypt http-errors nodemon

//External Imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//Internal Imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler.js");

const app = express();
dotenv.config(); //process.env.APP_NAME

//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Successful!");
  })
  .catch((err) => {
    console.log(err);
  });

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //extended true means it can parse query parameter too

//set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup

//404 not found error handling
app.use(notFoundHandler);

//Final error handling
app.use(errorHandler);

//app listen

app.listen(process.env.PORT, () => {
  console.log(`App listening to port ${process.env.PORT}`);
});
