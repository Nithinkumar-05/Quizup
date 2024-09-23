import { FaHashtag } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Quizzes = () => {
  const [quizCode, setQuizCode] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate(); 

  // Fetch quiz data by quiz code
  const handleClick = async () => {
    try {
      const response = await axios.get(`http://localhost:1000/host/getQuiz/${quizCode}`);
      setQuizData(response.data.quiz);
      setUserAnswers({});
      setError("");
    } catch (err) {
      setError("Quiz not found. Please try again.");
      setQuizData(null);
    }
  };

  // Handle answer selection
  const handleAnswerChange = (questionId, answerIndex) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerIndex,
    }));
  };

  // Render the current question and its options
  const renderQuestion = () => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    return (
      <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-2">
          {currentQuestionIndex + 1}. {currentQuestion.questionText}
        </h3>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, optIndex) => (
            <button
              key={optIndex}
              onClick={() => handleAnswerChange(currentQuestion._id, optIndex)}
              className={`w-full p-4 rounded-lg border ${
                userAnswers[currentQuestion._id] === optIndex
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render question navigation
  const renderQuestionNavigation = () => {
    return (
      <div className="flex items-center space-x-4 mb-6">
        {quizData.questions.map((question, index) => (
          <div key={index} className="flex items-center">
            <button
              className={`w-10 h-10 rounded-full text-white ${
                userAnswers[question._id] === undefined // No answer selected
                  ? "bg-red-500" // Glow red if no answer chosen
                  : "bg-green-500" // Glow green if any option is chosen
              } ${currentQuestionIndex === index && userAnswers[question._id] === undefined ? "animate-pulse" : ""}`} // Pulse effect only if no answer is chosen
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
            {index < quizData.questions.length - 1 && (
              <span className="mx-2 text-gray-400">
                <HiArrowRight />
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // Submit the quiz and send results to backend
  const handleSubmit = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const quizId = quizData._id;
    const creator = quizData.creator;
    const quizTitle = quizData.title;
    let score = 0;

    // Calculate score
    quizData.questions.forEach((question) => {
      if (userAnswers[question._id] === question.correctOptionIndex) {
        score += 1;
      }
    });

    const data = {
      userId,
      quizId,
      quizTitle,
      creator,
      score,
      totalQuestions: quizData.questions.length,
    };

    try {
      await axios.post("http://localhost:1000/contest/results", data);
      console.log("Results posted successfully");

      // Update localStorage index to display results
      localStorage.setItem("index", "3");

      // Redirect to Results page
      navigate("/StudentDashboard/Results", { state: { quizData, userAnswers } });
    } catch (error) {
      console.error("Error posting results:", error);
    }
  }, [navigate, quizData, userAnswers]);

  return (
    <div className="p-6">
      {!quizData ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Quizzes</h1>
          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl font-semibold mb-4">Want to join a live quiz?</h2>
            <div className="flex items-center w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-md">
              <span className="flex items-center justify-center px-4 text-green-600">
                <FaHashtag />
              </span>
              <input
                type="text"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value)}
                placeholder="Enter code here"
                className="w-full py-2 px-3 text-gray-700 rounded-l-none focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                className="flex items-center justify-center p-4 bg-green-600 hover:bg-green-700 text-white rounded-r-lg"
                onClick={handleClick}
              >
                <HiArrowRight />
              </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">{quizData.title}</h1>

          {/* Render the question navigation */}
          {renderQuestionNavigation()}

          {/* Render the current question */}
          {renderQuestion()}

          {/* Submit Button */}
          {currentQuestionIndex === quizData.questions.length - 1 ? (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            >
              Next
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Quizzes;
