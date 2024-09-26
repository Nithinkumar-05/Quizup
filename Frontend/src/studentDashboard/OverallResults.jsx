import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const OverallResults = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // Number of results per page
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/contest/results/user/${userId}`
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [userId]);

  const handleRowClick = (result) => {
    setSelectedResult(result);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedResult(null);
  };

  // Pagination Logic
  const totalPages = Math.ceil(results.length / resultsPerPage);
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Complete Results</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentResults.length > 0 ? (
          currentResults.map((result) => (
            <div
              key={result._id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleRowClick(result)}
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold">{result.quizTitle}</h2>
                <p className="text-gray-600">Creator: {result.creator}</p>
                <p className="text-gray-500">
                  Date: {new Date(result.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-7">
        <button
          className={`px-4 py-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 text-white'} rounded`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="self-center">Page {currentPage} of {totalPages}</span>
        <button
          className={`px-4 py-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 text-white'} rounded`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal to show Gauge Chart */}
      <Modal open={open} onClose={handleClose}>
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleClose}
            >
              <Close />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {selectedResult?.quizTitle} - Score
            </h2>
            {selectedResult && (
              <div style={{ height: 200 }}>
                <Gauge
                  value={selectedResult.score}
                  valueMax={selectedResult.totalQuestions}
                  startAngle={-110}
                  endAngle={110}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 40,
                      transform: "translate(0px, 0px)",
                    },
                  }}
                  text={({ value, valueMax }) => `${value} / ${valueMax}`}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OverallResults;
