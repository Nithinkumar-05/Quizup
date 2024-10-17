const express = require("express");
const connection = require("./connection/database");
const port = process.env.PORT || 1000;
const app = express();
const cors = require("cors");
const loginRoute = require("./routes/login.route");
const quizRoute = require("./routes/quiz.route");
const resultRoute = require("./routes/result.route");
// const userRoute = require("./routes/user.route");
// const questionRoute = require("./routes/question.route");
// const resultRoute = require("./routes/result.route");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://quized.vercel.app", // Only allow requests from your frontend
  })
);

// Routes
app.use("/quiz", loginRoute);
app.use("/host", quizRoute);
app.use("/contest", resultRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
