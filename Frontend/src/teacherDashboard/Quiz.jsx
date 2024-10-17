import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizList from "./Quizlist";
const baseurl = import.meta.env.REACT_APP_BASE_URL || "http://localhost:1000";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      try {
        //console.log(userId);
        // Fetch quizzes using GET request with userId as part of the URL path
        const response = await axios.get(
          `${baseurl}/host/getQuizzes/${userId}`
        );

        // Set quizzes state with fetched data
        if (response.data && Array.isArray(response.data)) {
          setQuizzes(response.data[0].quizzes || []); // Assuming response.data is an array with a single object
        } else {
          console.error("Unexpected response structure:", response.data);
        }

        // console.log('Fetched quizzes:', response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [userId]);

  return (
    <>
      <QuizList quizzes={quizzes} />
    </>
  );
};

export default Quiz;
