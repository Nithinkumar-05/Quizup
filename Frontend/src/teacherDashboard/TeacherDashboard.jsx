import { useState } from "react";
import { useAuth } from "../Routes/AuthContext";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Quiz from "./Quiz";
import CreateQuiz from "./CreateQuiz";

const TeacherDashboard = () => {
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [index, setIndex] = useState(1);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        auth.logout();
        navigate("/");
    };

    const components = [<Profile/>, <CreateQuiz/>, <Quiz/>];

    return (
        <div className="flex min-h-screen h-auto">
            {/* Sidebar */}
            <div className="w-1/6 bg-cyan-800 text-white flex flex-col flex-grow-0">
                <div className="text-center py-4 border-b border-gray-700">
                    <p className="text-sm font-bold">Welcome, {userId ? userId : "teacher"}</p>
                </div>
                <ul className="flex-grow px-4 py-1">
                    <li className="py-3 hover:bg-gray-700 rounded-md px-4" onClick={() => setIndex(0)}>
                        Profile
                    </li>
                    <li className="py-3 hover:bg-gray-700 rounded-md px-4" onClick={() => setIndex(1)}>
                        Create Quiz
                    </li>
                    <li className="py-3 hover:bg-gray-700 rounded-md px-4" onClick={() => setIndex(2)}>
                        Quiz
                    </li>
                </ul>
                <div className="py-4 px-4 border-t border-gray-700">
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md" onClick={handleLogOut}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main content area */}
            <div className="w-full p-8 min-h-screen bg-gray-100">
                {components[index]}
            </div>
        </div>
    );
};

export default TeacherDashboard;
