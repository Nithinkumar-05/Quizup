require("dotenv").config();

const mongoose = require("mongoose");
const connection = mongoose.connect(
  process.env.MONGO_URI
);
connection
  .then(() => {
    console.log("connection with Quiz database is successful");
  })
  .catch((err) => {
    console.log("connection with Quiz database is un-successful");
  });

module.exports = connection;
