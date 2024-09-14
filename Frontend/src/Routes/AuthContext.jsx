import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const baseurl = import.meta.env.REACT_APP_BASE_URL || "http://localhost:1000";

const AuthContext = createContext();

// Create AuthProvider
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      const response = await axios.post(`${baseurl}/quiz/login`, data);
      const { role, token, user } = response.data;

      setToken(token);
      setRole(role);
      setUserId(user.userId);
      setName(user.fullName);
      console.log(role,userId,name);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", user.userId); 
      localStorage.setItem("name", user.fullName); 
    } catch (err) {
      console.log("Error during logging the session");
      console.log(err);
    } finally {
      setLoading(false); // Ensure loading is set back to false
    }
  };

  const logout = () => {
    setToken("");
    setUserId("");
    setRole("");
    setName("");

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider value={{ token, userId, role, name, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
