import { useEffect, useState } from "react";
import { useAuth } from "../Routes/AuthContext";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Quizzes from "./Quizzes";
import OverallResults from "./OverallResults";
import Results from "./Results";

const StudentDashboard = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [index, setIndex] = useState(parseInt(localStorage.getItem("index")) || 0); // Retrieve the stored index or default to 0
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.logout();
    navigate("/");
  };

  const components = [<Profile />, <Quizzes />, <OverallResults />, <Results />];

  // Update localStorage whenever index changes
  useEffect(() => {
    localStorage.setItem("index", index);
  }, [index]);

  // Handle page navigation
  const handlePageChange = (idx) => {
    setIndex(idx);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-cyan-800 text-white flex flex-col flex-grow-0">
        <div className="text-center py-4 border-b border-gray-700">
          <p className="text-sm font-bold">Welcome, {userId ? userId : "student"}</p>
        </div>
        <ul className="flex-grow px-4 py-1">
          <li className="py-3 hover:bg-gray-700 rounded-md px-4" onClick={() => handlePageChange(0)}>
            Profile
          </li>
          <li className="py-3 hover:bg-gray-700 rounded-md px-4" onClick={() => handlePageChange(1)}>
            Quizzes
          </li>
          <li className="py-3 hover:bg-gray-700 rounded-md px-4" onClick={() => handlePageChange(2)}>
            Results
          </li>
        </ul>
        <div className="py-4 px-4 border-t border-gray-700">
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="w-full p-8 bg-gray-100">
        {/* Render the selected component based on the index */}
        {components[index]}
      </div>
    </div>
  );
};

export default StudentDashboard;
