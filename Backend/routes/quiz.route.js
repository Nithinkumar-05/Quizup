const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quiz.controller'); // Adjust the path to your controller

// Instantiate the QuizController
const quizController = new QuizController();

// Route to create a quiz
router.post('/createQuiz', (req, res) => quizController.createQuiz(req, res));

// Route to delete a quiz by ID
router.delete('/deleteQuiz/:id', (req, res) => quizController.deleteQuiz(req, res));

module.exports = router;
