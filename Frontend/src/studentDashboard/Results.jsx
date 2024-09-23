import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
const Results = () => {
  const location = useLocation();
  const { quizData, userAnswers } = location.state || {};
  const [score, setScore] = useState(0);

  // Calculate score when the component mounts
  useEffect(() => {
    if (quizData) {
      const calculatedScore = calculateScore();
      setScore(calculatedScore);
    }
  }, [quizData]);

  const calculateScore = () => {
    let score = 0;
    quizData.questions.forEach((question) => {
      if (userAnswers[question._id] === question.correctOptionIndex) {
        score += 1;
      }
    });
    return score;
  };

  // Handle Go Back to update localStorage
  const handleGoBack = () => {
    localStorage.setItem("index", "1"); // Set index to 1 to show Quizzes component
    window.location.href = "/StudentDashboard"; // Navigate back
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>

      {quizData && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{quizData.title}</h2>
          <p className="text-lg">
            Your Score: {score} / {quizData.questions.length}
          </p>
          <ul className="mt-4">
            {quizData.questions.map((question, index) => (
              <li key={index} className="mb-4">
                <p className="font-semibold">
                  {index + 1}. {question.questionText}
                </p>
                <p className="text-gray-600">
                  Your answer: {question.options[userAnswers[question._id]]}
                </p>
                <p className="text-green-600">
                  Correct answer: {question.options[question.correctOptionIndex]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Go Back Button */}
      <button
        onClick={handleGoBack}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default Results;
