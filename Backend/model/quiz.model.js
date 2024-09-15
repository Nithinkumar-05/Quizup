const mongoose = require('mongoose');

// Question Schema
const QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String], // Array of strings for options
        required: true
    },
    correctOptionIndex: {
        type: Number,
        required: true
    }
});

// Quiz Schema
const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [QuestionSchema], // Array of questions
    creator: {
        type: String, // Assuming userId is a string
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Model Creation
const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
