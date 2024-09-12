// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login";
import SignUp from "./SignUp";
import Footer from "./Footer";
function App() {
  const token= localStorage.getItem("token");
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
        </Routes>
        {!token && <Footer/>}
      </Router>
    </>
  );
}

export default App;
