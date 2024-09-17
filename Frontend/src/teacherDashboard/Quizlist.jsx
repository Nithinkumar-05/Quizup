import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const QuizList = ({ quizzes }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const quizzesPerPage = 10;

  // Handle quiz click to show modal
  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };

  // Handle close of the modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedQuiz(null);
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
      {quizzes.length > 0 ? (
        <div>
          <div className="min-h-[80vh h-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {displayedQuizzes.map((quiz) => (
                    <tr key={quiz._id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleQuizClick(quiz)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quiz.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(quiz.createdAt).toLocaleDateString()}
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
            nextClassName="px-4 py-2   cursor-pointer text-blue-500 hover:text-gray-900"
            previousLinkClassName="flex items-center justify-center"
            nextLinkClassName="flex items-center justify-center"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      ) : (
        <p>No quizzes available</p>
      )}

      {/* Modal for showing quiz details */}
      {showModal && selectedQuiz && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 min-h-screen">
          <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold mb-4">{selectedQuiz.title}</h2>
            <p className="text-gray-600 mb-4">
              Created on: {new Date(selectedQuiz.createdAt).toLocaleDateString()}
            </p>
            <h3 className="text-lg font-semibold mb-2">Questions:</h3>
            <table className="min-w-full divide-y divide-gray-200">
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
              onClick={handleClose}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizList;
