const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  userId: {
    type: String, // Change to String to match frontend data
    required: true,
  },
  quizId: {
    type: String, // Change to String to match frontend data
    required: true,
  },
  creator: {
    type: String, // Change to String to match frontend data
    required: true,
  },
  quizTitle: { // New field for storing quiz title
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema
const Results = mongoose.model("Results", resultsSchema);

module.exports = Results;
