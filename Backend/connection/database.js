require("dotenv").config();

const mongoose = require("mongoose");
const connection = mongoose.connect(
  "mongodb+srv://cvrquiz:cvrquiz@cluster0.50h1fry.mongodb.net/quiz"
);
connection
  .then(() => {
    console.log("connection with Quiz database is successful");
  })
  .catch((err) => {
    console.log("connection with Quiz database is un-successful");
  });

module.exports = connection;
