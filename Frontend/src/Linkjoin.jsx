import React from "react";
import { FaHashtag } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const JoinQuiz = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-xl font-semibold mb-4">Want to join a live quiz?</h2>
      <div className="flex items-center w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-md">
        <span className="flex items-center justify-center px-4 text-green-600">
          <FaHashtag />
        </span>
        <input
          type="text"
          placeholder="Enter code here"
          className="w-full py-2 px-3 text-gray-700 rounded-l-none focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button className="flex items-center justify-center p-4 bg-green-600 hover:bg-green-700 text-gray rounded-r-lg">
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default JoinQuiz;
