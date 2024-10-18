const express = require("express");
const connection = require("./connection/database");
const cors = require("cors");
const bodyParser = require("body-parser");

const loginRoute = require("./routes/login.route");
const quizRoute = require("./routes/quiz.route");
const resultRoute = require("./routes/result.route");

const app = express();
const port = process.env.PORT || 1000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/quiz", loginRoute); // Make sure the routes are properly required
app.use("/host", quizRoute);
app.use("/contest", resultRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
