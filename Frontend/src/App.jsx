import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Routes/AuthContext";
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login";
import SignUp from "./SignUp";
import Footer from "./Footer";
import AdminRoutes from "./Routes/AdminRoutes";
import StudentRoutes from "./Routes/StudentRoutes";
import TeacherRoutes from "./Routes/TeacherRoutes";
import StudentDashboard from "./studentDashboard/StudentDashboard";
import TeacherDashboard from "./teacherDashboard/TeacherDashboard";
import AdminDashboard from "./adminDashboard/AdminDashboard";
import Results from "./studentDashboard/Results";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Update token state when it changes in localStorage
  useEffect(() => {
    const handleTokenChange = () => {
      setToken(localStorage.getItem("token"));
    };

    // Listen for storage changes (especially useful if the token is modified in another tab)
    window.addEventListener("storage", handleTokenChange);

    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<StudentRoutes />}>
            <Route path="/StudentDashboard" element={<StudentDashboard />} />
            <Route path="/StudentDashboard/Results" element={<Results />} />
          </Route>
          <Route element={<TeacherRoutes />}>
            <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
          </Route>
        </Routes>
        {!token && <Footer />} {/* Conditionally render Footer */}
      </Router>
    </AuthProvider>
  );
}

export default App;
