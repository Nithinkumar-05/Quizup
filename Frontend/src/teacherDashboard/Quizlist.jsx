import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight, FaEye, FaUsers, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const QuizList = ({ quizzes }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const quizzesPerPage = 10;

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuestions(true);
    setShowParticipants(false);
  };

  const handleBackFromQuestions = () => {
    setShowQuestions(false);
    setSelectedQuiz(null);
  };

  const handleBackFromParticipants = () => {
    setShowParticipants(false);
    setParticipants([]);
  };

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

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const startIndex = currentPage * quizzesPerPage;
  const endIndex = startIndex + quizzesPerPage;
  const displayedQuizzes = quizzes.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {!showQuestions && !showParticipants ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Quiz List</h1>
          {quizzes.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayedQuizzes.map((quiz) => (
                      <tr key={quiz._id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{new Date(quiz.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleQuizClick(quiz)}
                            className="text-cyan-800 hover:text-cyan-600 mr-4"
                          >
                            <FaEye className="inline-block mr-1" /> View Questions
                          </button>
                          <button
                            onClick={() => handleFetchParticipants(quiz._id)}
                            className="text-green-600 hover:text-green-400"
                          >
                            <FaUsers className="inline-block mr-1" /> View Participants
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <ReactPaginate
                  pageCount={Math.ceil(quizzes.length / quizzesPerPage)}
                  onPageChange={handlePageClick}
                  containerClassName="flex justify-center items-center space-x-2"
                  pageClassName="px-3 py-1 rounded-md bg-white border border-gray-300 cursor-pointer hover:bg-gray-50"
                  pageLinkClassName="text-gray-600"
                  activeClassName="bg-blue-600 text-white border-blue-600 hover:bg-gray-300"
                  previousLabel={<FaChevronLeft />}
                  nextLabel={<FaChevronRight />}
                  previousClassName="px-3 py-1 rounded-md bg-white cursor-pointer hover:bg-gray-300"
                  nextClassName="px-3 py-1 rounded-md bg-white  cursor-pointer hover:bg-gray-50"
                  previousLinkClassName="text-gray-600"
                  nextLinkClassName="text-gray-600"
                  disabledClassName="opacity-50 cursor-not-allowed"
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No quizzes available</p>
          )}
        </>
      ) : showQuestions ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedQuiz.title}</h2>
          <h2 className="text-gray-600 mb-4">Quiz Id:{selectedQuiz._id}</h2>
          <p className="text-gray-600 mb-4">
            Created on: {new Date(selectedQuiz.createdAt).toLocaleDateString()}
          </p>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Questions:</h3>
          <div className="space-y-6">
            {selectedQuiz.questions.map((q, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-800 mb-2">Q{index + 1}: {q.questionText}</p>
                <ul className="list-disc list-inside space-y-1">
                  {q.options.map((option, idx) => (
                    <li
                      key={idx}
                      className={`text-gray-600 ${idx === q.correctOptionIndex ? "font-semibold text-green-600" : ""}`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button
            onClick={handleBackFromQuestions}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Quiz List
          </button>
        </div>
      ) : showParticipants ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Participants</h2>
          {participants.length > 0 ? (
            <div className="overflow-x-auto">
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
                    <tr key={participant._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.userId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.score}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.totalQuestions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No participants available</p>
          )}
          <button
            onClick={handleBackFromParticipants}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Quiz List
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default QuizList;