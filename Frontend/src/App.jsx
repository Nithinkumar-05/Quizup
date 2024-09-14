// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import {AuthProvider} from "./Routes/AuthContext";
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
function App() {
  const token= localStorage.getItem("token");
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/SignUp" element={<SignUp/>}></Route>

            <Route element={<AdminRoutes/>}>
              <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
            </Route>
            <Route element={<StudentRoutes/>}>
                <Route path="/StudentDashboard" element={<StudentDashboard/>}></Route>
            </Route>
            <Route element={<TeacherRoutes/>}>
              <Route path="/TeacherDashboard" element={<TeacherDashboard/>}></Route>
            </Route>
          </Routes>
          {!token && <Footer/>}
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
