import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const QuizList = ({ quizzes }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const quizzesPerPage = 10;

  // Handle quiz click to show questions div
  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuestions(true);
    setShowParticipants(false);
  };

  // Handle back to quiz list from questions
  const handleBackFromQuestions = () => {
    setShowQuestions(false);
    setSelectedQuiz(null);
  };

  // Handle back to quiz list from participants
  const handleBackFromParticipants = () => {
    setShowParticipants(false);
    setParticipants([]);
  };

  // Handle fetching participants for a quiz
  const handleFetchParticipants = async (quizId) => {
    try {
      const response = await axios.get(`http://localhost:1000/contest/results/${quizId}`);
      setParticipants(response.data.results);
      setShowParticipants(true);
      setShowQuestions(false);
    } catch (error) {
      console.error("Error fetching participants", error);
    }
  };

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Calculate quizzes to display based on current page
  const startIndex = currentPage * quizzesPerPage;
  const endIndex = startIndex + quizzesPerPage;
  const displayedQuizzes = quizzes.slice(startIndex, endIndex);

  return (
    <div>
      {!showQuestions && !showParticipants ? (
        <>
          {quizzes.length > 0 ? (
            <div>
              <div className="min-h-[80vh] h-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayedQuizzes.map((quiz) => (
                      <tr key={quiz._id} className="cursor-pointer hover:bg-gray-100">
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          onClick={() => handleQuizClick(quiz)}
                        >
                          {quiz.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(quiz.createdAt).toLocaleDateString()}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 cursor-pointer"
                          onClick={() => handleFetchParticipants(quiz._id)}
                        >
                          View Participants
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ReactPaginate
                pageCount={Math.ceil(quizzes.length / quizzesPerPage)}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center items-center mt-4 space-x-2"
                pageClassName="px-4 py-2 border border-gray-300 rounded cursor-pointer"
                pageLinkClassName="text-gray-800"
                activeClassName="bg-blue-500 text-white"
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                previousClassName="px-4 py-2 cursor-pointer text-blue-500 hover:text-gray-900"
                nextClassName="px-4 py-2 cursor-pointer text-blue-500 hover:text-gray-900"
                previousLinkClassName="flex items-center justify-center"
                nextLinkClassName="flex items-center justify-center"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          ) : (
            <p>No quizzes available</p>
          )}
        </>
      ) : showQuestions ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{selectedQuiz.title}</h2>
          <p className="text-gray-600 mb-4">
            Created on: {new Date(selectedQuiz.createdAt).toLocaleDateString()}
          </p>
          <h3 className="text-lg font-semibold mb-2">Questions:</h3>
          <table className="min-w-full divide-y divide-gray-200 mb-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedQuiz.questions.map((q, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{q.questionText}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <ul className="list-disc list-inside">
                      {q.options.map((option, idx) => (
                        <li key={idx} className={idx === q.correctOptionIndex ? "font-bold" : ""}>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleBackFromQuestions}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back
          </button>
        </div>
      ) : showParticipants ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Participants</h2>
          {participants.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Questions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {participants.map((participant) => (
                  <tr key={participant._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.userId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.totalQuestions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No participants available</p>
          )}
          <button
            onClick={handleBackFromParticipants}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default QuizList;
