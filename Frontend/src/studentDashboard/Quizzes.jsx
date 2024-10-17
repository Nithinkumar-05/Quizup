import { FaHashtag } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { FiClock } from "react-icons/fi";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseurl = import.meta.env.REACT_APP_BASE_URL || "http://localhost:1000";

const Quizzes = () => {
  const [quizCode, setQuizCode] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [overallTimeLeft, setOverallTimeLeft] = useState(0);
  const navigate = useNavigate();

  // Fetch quiz data by quiz code
  const handleClick = async () => {
    try {
      const response = await axios.get(`${baseurl}/host/getQuiz/${quizCode}`);
      const quiz = response.data.quiz;
      setQuizData(quiz);
      setUserAnswers({});
      setOverallTimeLeft(quiz.questions.length * 60); // Set overall timer
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

  // Format time to mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Render the current question and its options
  const renderQuestion = () => {
    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
      <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md mb-6 relative">
        <h3 className="text-lg font-semibold mb-2 pr-16">
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
              disabled={overallTimeLeft === 0}
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
      <div
        className="flex items-center space-x-4 mb-6 overflow-x-auto pb-2"
        style={{ maxWidth: "100%", scrollbarWidth: "thin" }}
      >
        {quizData.questions.map((question, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <button
              className={`w-10 h-10 rounded-full text-white ${
                userAnswers[question._id] === undefined
                  ? "bg-red-500"
                  : "bg-green-500"
              } ${
                currentQuestionIndex === index &&
                userAnswers[question._id] === undefined
                  ? "animate-pulse"
                  : ""
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
              disabled={overallTimeLeft === 0}
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
      await axios.post(`${baseurl}/contest/results`, data);
      console.log("Results posted successfully");

      // Update localStorage index to display results
      localStorage.setItem("index", "3");

      // Redirect to Results page
      navigate("/StudentDashboard/Results", {
        state: { quizData, userAnswers },
      });
    } catch (error) {
      console.error("Error posting results:", error);
    }
  }, [navigate, quizData, userAnswers]);

  // Overall timer effect
  useEffect(() => {
    if (!quizData || overallTimeLeft === 0) return;

    const timer = setInterval(() => {
      setOverallTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData, overallTimeLeft, handleSubmit]);

  return (
    <div className="p-6">
      {!quizData ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Quizzes</h1>
          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Want to join a live quiz?
            </h2>
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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{quizData.title}</h1>
            <div className="flex items-center text-lg font-semibold">
              <FiClock className="mr-2" />
              <span className={overallTimeLeft <= 60 ? "text-red-500" : ""}>
                {formatTime(overallTimeLeft)}
              </span>
            </div>
          </div>

          {renderQuestionNavigation()}

          {renderQuestion()}

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
              disabled={overallTimeLeft === 0}
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
