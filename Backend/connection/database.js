require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");
const connection = mongoose.connect(MONGO_URI);
connection
  .then(() => {
    console.log("connection with Quiz database is successful");
  })
  .catch((err) => {
    console.log("connection with Quiz database is un-successful",err);
  });

module.exports = connection;
