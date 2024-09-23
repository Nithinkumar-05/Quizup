import React, { useEffect, useState } from "react";
import axios from "axios";

const OverallResults = () => {
  const [results, setResults] = useState([]);
  const userId = localStorage.getItem("userId"); // Get the userId from localStorage

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/contest/results/user/${userId}`);
        setResults(response.data.results); // Accessing results from the API response
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Complete Results</h1>

      {results.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Quiz Title</th>
              <th className="border px-4 py-2">Score</th>
              <th className="border px-4 py-2">Total Questions</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id} className="hover:bg-slate-50">
                <td className="border px-4 py-2">{result.quizTitle}</td>
                <td className="border px-4 py-2">{result.score}</td>
                <td className="border px-4 py-2">{result.totalQuestions}</td>
                <td className="border px-4 py-2">{new Date(result.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default OverallResults;
