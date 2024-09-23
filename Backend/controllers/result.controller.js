const Results = require("../model/result.model"); // Adjust the path as necessary
const User = require("../model/user.model"); // Import the User model
const Quiz = require("../model/quiz.model"); // Import the Quiz model

// Controller to post results
const postResults = async (req, res) => {
  const { userId, quizId, creator, score, totalQuestions, quizTitle } = req.body; // Add quizTitle here

  try {
    // Check if results already exist for the given user and quiz
    const existingResult = await Results.findOne({ userId, quizId });
    
    if (existingResult) {
      return res.status(200).json({ message: "Results already submitted for this quiz by the user." });
    }

    // Create a new result entry
    const newResult = new Results({
      userId,
      quizId,
      creator,
      quizTitle, // Include quizTitle here
      score,
      totalQuestions,
    });

    await newResult.save();
    return res.status(201).json({ message: "Results saved successfully", newResult });
  } catch (error) {
    console.error("Error saving results:", error);
    return res.status(500).json({ message: "Error saving results", error: error.message });
  }
};

  
// Controller to get results for a specific quiz and its participants
const getResultsByQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    // Find all results for the given quizId
    const results = await Results.find({ quizId })
      .populate("userId", "fullName emailId") // Populate user information
      .populate("creator", "fullName emailId") // Populate quiz creator information
      .exec();

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No results found for this quiz." });
    }

    return res.status(200).json({
      message: "Results retrieved successfully",
      results,
    });
  } catch (error) {
    console.error("Error retrieving results:", error); // Log the error for debugging
    return res.status(500).json({ message: "Error retrieving results", error: error.message });
  }
};

// Controller to get results for a specific user
const getResultsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all results for the given userId
    const results = await Results.find({ userId })
      .populate("quizId", "title") // Populate quiz information
      .populate("creator", "fullName emailId") // Populate quiz creator information
      .exec();

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No contests found for this user." });
    }

    return res.status(200).json({
      message: "User contests retrieved successfully",
      results,
    });
  } catch (error) {
    console.error("Error retrieving user contests:", error); // Log the error for debugging
    return res.status(500).json({ message: "Error retrieving user contests", error: error.message });
  }
};

module.exports = {
  postResults,
  getResultsByQuiz,
  getResultsByUser, // Export the new function
};