const express = require("express");
const router = express.Router();
const resultsController = require("../controllers/result.controller"); // Adjust the path as necessary

// POST results
router.post("/results", resultsController.postResults);

// GET results by quiz ID
router.get("/results/:quizId", resultsController.getResultsByQuiz);

//GET results by userId
router.get("/results/user/:userId", resultsController.getResultsByUser);
module.exports = router;
