import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useState } from "react";
import axios from "axios"; // For making API calls

const SignUpPage = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState(""); // New state for role
  const [error, setError] = useState("");
  const baseurl = import.meta.env.VITE_BASE_URL || "http://localhost:1000";
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseurl}/quiz/register`, {
        fullName,
        phoneNumber,
        emailId,
        password,
        userId,
        role, // Include role in the request payload
      });

      if (response.status === 200) {
        console.log("Sign-up successful", response.data);
        // Refresh the page upon successful sign-up
        window.location.reload();
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError("Sign-up failed. Please try again.");
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen  p-5 m-5">
      <Container component="main" maxWidth="md">
        <Paper elevation={8} className="p-8 rounded-lg shadow-lg bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="flex items-center justify-center md:display-none">
              <img
                src="/Images/Quizlogo3.jpg"
                alt="Sign Up"
                className="object-cover w-full h-full rounded-lg shadow-md"
              />
            </div>

            {/* Sign Up Form Section */}
            <div className="flex flex-col justify-center p-4">
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                align="center"
                className="text-gray-800 font-semibold mb-4"
              >
                Sign Up
              </Typography>
              {error && (
                <Typography
                  color="error"
                  align="center"
                  className="mb-4 text-red-600"
                >
                  {error}
                </Typography>
              )}
              <form noValidate onSubmit={handleSignUp} className="space-y-4">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="userId"
                  label="User ID"
                  name="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="bg-gray-50"
                  InputProps={{
                    classes: { notchedOutline: "border-gray-300" },
                  }}
                  InputLabelProps={{
                    className: "text-gray-700",
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-gray-50"
                  InputProps={{
                    classes: { notchedOutline: "border-gray-300" },
                  }}
                  InputLabelProps={{
                    className: "text-gray-700",
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-gray-50"
                  InputProps={{
                    classes: { notchedOutline: "border-gray-300" },
                  }}
                  InputLabelProps={{
                    className: "text-gray-700",
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="emailId"
                  label="Email Address"
                  name="emailId"
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="bg-gray-50"
                  InputProps={{
                    classes: { notchedOutline: "border-gray-300" },
                  }}
                  InputLabelProps={{
                    className: "text-gray-700",
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50"
                  InputProps={{
                    classes: { notchedOutline: "border-gray-300" },
                  }}
                  InputLabelProps={{
                    className: "text-gray-700",
                  }}
                />

                {/* Role Selection */}
                <FormGroup className="mt-4">
                  <Typography
                    variant="body1"
                    align="center"
                    className="mb-2 text-gray-700"
                  >
                    Select Role
                  </Typography>
                  <div className="flex justify-around">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={role === "student"}
                          onChange={() =>
                            setRole(role === "student" ? "" : "student")
                          }
                          color="primary"
                        />
                      }
                      label="Student"
                      className="text-gray-700"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={role === "teacher"}
                          onChange={() =>
                            setRole(role === "teacher" ? "" : "teacher")
                          }
                          color="primary"
                        />
                      }
                      label="Teacher"
                      className="text-gray-700"
                    />
                  </div>
                </FormGroup>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="mt-4 py-2 text-lg font-semibold"
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUpPage;
