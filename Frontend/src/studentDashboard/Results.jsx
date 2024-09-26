import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const CustomCard = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizData, userAnswers } = location.state || {};
  const [score, setScore] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (quizData) {
      const calculatedScore = calculateScore();
      setScore(calculatedScore);
      setChartData([
        { name: 'Results', Correct: calculatedScore, Incorrect: quizData.questions.length - calculatedScore }
      ]);
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

  const handleGoBack = () => {
    localStorage.setItem("index", "1");
    navigate("/StudentDashboard");
  };

  if (!quizData) {
    return <div>No quiz data available.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz Results</h1>
      
      <CustomCard className="mb-8">
        <h2 className="text-2xl font-semibold">{quizData.title}</h2>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold">
            {score} / {quizData.questions.length}
          </p>
          <p className="text-xl text-gray-600">
            {((score / quizData.questions.length) * 100).toFixed(2)}% Correct
          </p>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Correct" fill="#4CAF50" />
                <Bar dataKey="Incorrect" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CustomCard>

      <h3 className="text-2xl font-semibold mb-4">Question Review</h3>
      {quizData.questions.map((question, index) => (
        <CustomCard key={index}>
          <h4 className="text-lg font-semibold">
            Question {index + 1}: {question.questionText}
          </h4>
          <p className="mb-2">
            <span className="font-semibold">Your answer: </span>
            {question.options[userAnswers[question._id]]}
            {userAnswers[question._id] === question.correctOptionIndex ? (
              <FaCheckCircle className="inline-block ml-2 text-green-500" />
            ) : (
              <FaTimesCircle className="inline-block ml-2 text-red-500" />
            )}
          </p>
          <p className="text-green-600">
            <span className="font-semibold">Correct answer: </span>
            {question.options[question.correctOptionIndex]}
          </p>
        </CustomCard>
      ))}

      <button
        onClick={handleGoBack}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Back to Quizzes
      </button>
    </div>
  );
};

export default Results;
