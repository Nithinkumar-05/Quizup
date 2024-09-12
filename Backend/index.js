const express = require("express");
const connection = require("./connection/database");
const port = 1000 || process.env.PORT;
const app = express();
const cors = require("cors");
const loginRoute = require("./routes/login.route");
// const quizRoute = require("./routes/quiz.route");
// const userRoute = require("./routes/user.route");
// const questionRoute = require("./routes/question.route");
// const resultRoute = require("./routes/result.route");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

app.use("/quiz", loginRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
