import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useState } from "react";
import {useAuth} from "./Routes/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const baseurl = import.meta.env.VITE_BASE_URL || "http://localhost:1000";
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {

    e.preventDefault();
    console.log(userId, password);
    try {
        await auth.login({userId,password});
        const role = localStorage.getItem("role");
        console.log("logged in role: ",role);

        if(role){
            switch(role){
                case "admin":
                  navigate("/AdminDashboard");
                  break;
                case "student":
                  navigate("/StudentDashboard");
                  break;
                case "teacher":
                  navigate("/TeacherDashboard");
                  break;
                default:
                  navigate("/");
                  
            }
        }

      console.log("Login successful", response.data);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background ">
      <Container component="main" maxWidth="md" className="py-8">
        <Paper elevation={9} className="p-8">
          {/* Box for Image and Form */}
          <div className="flex items-center justify-between space-x-8">
            {/* Image Section */}
            <div className="w-1/2">
              <img
                src="/Images/Quizimg2.png"
                alt="Quiz Login"
                width={500}
                height={500}
              />
            </div>

            {/* Login Form Section */}
            <div className="w-1/2">
              <Typography
                variant="h5"
                component="h1"
                gutterBottom
                align="center"
              >
                Login
              </Typography>
              {error && (
                <Typography color="error" align="center">
                  {error}
                </Typography>
              )}
              <form noValidate onSubmit={handleLogin}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="userId"
                  label="userId"
                  name="userId"
                  autoFocus
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="mt-4"
                >
                  Log In
                </Button>
              </form>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
