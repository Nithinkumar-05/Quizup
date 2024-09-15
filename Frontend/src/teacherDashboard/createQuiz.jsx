import { useState } from "react";
import axios from 'axios'
const CreateQuiz = () => {

    const baseurl = import.meta.env.REACT_APP_BASE_URL || "http://localhost:1000";
    const [quizTitle, setQuizTitle] = useState(""); // Quiz title
    const [questions, setQuestions] = useState([
        { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 }
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Check if the current question is incomplete
    const isQuestionIncomplete = (question) => {
        return (
            question.questionText === "" ||
            question.options.some((option) => option === "") || // Any empty option
            question.correctOptionIndex === null // No correct option selected
        );
    };

    // Handler for updating the quiz title
    const handleTitleChange = (value) => {
        setQuizTitle(value);
    };

    // Handler for updating the question text
    const handleQuestionChange = (value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].questionText = value;
        setQuestions(updatedQuestions);
    };

    // Handler for updating an option's text
    const handleOptionChange = (optIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].options[optIndex] = value;
        setQuestions(updatedQuestions);
    };

    // Handler for changing the correct option
    const handleCorrectOptionChange = (value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].correctOptionIndex = parseInt(value);
        setQuestions(updatedQuestions);
    };

    // Add a new question and move to the next one
    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 }
        ]);
        setCurrentQuestionIndex(questions.length);
    };

    // Delete a question
    const handleDeleteQuestion = (index) => {
        const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(updatedQuestions);
        setCurrentQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    // Add a new option for the current question
    const handleAddOption = () => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].options.push("");
        setQuestions(updatedQuestions);
    };

    // Remove an option from the current question
    const handleRemoveOption = (optIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].options.splice(optIndex, 1);
        setQuestions(updatedQuestions);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        const quizData = {
            title: quizTitle,
            questions: questions,
            creator:userId
        };
        
        console.log("Quiz data:", quizData);
        try{
        //api call
        const response = await axios.post(`${baseurl}/host/createQuiz`,quizData);

        if(response.status == 201){
                alert("Quiz has been created.Share the link");
                clearForm();
        }   
        }
        catch(error){
            alert("Unknown error");
            console.log(error.message);
        }
    };
    const clearForm = () => {
        setQuizTitle("");
        setQuestions([
            { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 }
        ]);
    };
    // Navigate between questions
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <div className="p-4 h-auto">
            <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>

            {/* Quiz title input */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Quiz Title</label>
                <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter the quiz title"
                    required
                />
            </div>

            {/* Progress numbers */}
            <div className="flex items-center justify-center mb-6 space-x-2">
                {questions.map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white cursor-pointer 
                            ${currentQuestionIndex === index ? "bg-blue-500 shadow-lg shadow-blue-500/50" : ""}
                            ${isQuestionIncomplete(questions[index]) ? "bg-red-500 animate-pulse" : "bg-green-700"} 
                            ${index < currentQuestionIndex ? "bg-green-500" : ""}`}
                            onClick={() => setCurrentQuestionIndex(index)}
                        >
                            {index + 1}
                        </div>
                        {index < questions.length - 1 && (
                            <span className="text-gray-500">→</span>
                        )}
                    </div>
                ))}
            </div>


            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    {/* Question text input */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Question {currentQuestionIndex + 1}</label>
                        <input
                            type="text"
                            value={questions[currentQuestionIndex].questionText}
                            onChange={(e) => handleQuestionChange(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your question"
                            required
                        />
                    </div>

                    {/* Options inputs */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Options</label>
                        {questions[currentQuestionIndex].options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(optIndex, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder={`Option ${optIndex + 1}`}
                                    required
                                />
                                {questions[currentQuestionIndex].options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveOption(optIndex)}
                                        className="ml-2 text-red-500"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddOption}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-600"
                        >
                            Add Option
                        </button>
                    </div>

                    {/* Correct option selector */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Correct Option</label>
                        <select
                            value={questions[currentQuestionIndex].correctOptionIndex}
                            onChange={(e) => handleCorrectOptionChange(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                        >
                            {questions[currentQuestionIndex].options.map((_, optIndex) => (
                                <option key={optIndex} value={optIndex}>
                                    Option {optIndex + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Navigation and submit buttons */}
                <div className="flex justify-between">
                    {/* Previous button */}
                    <button
                        type="button"
                        onClick={handlePrevious}
                        className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400"
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>

                    {/* Next/Add Question/Delete Question buttons */}
                    <div className="flex space-x-2">
                        {currentQuestionIndex === questions.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Add Another Question
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Next
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => handleDeleteQuestion(currentQuestionIndex)}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            disabled={questions.length === 1} // Prevent deleting the last question
                        >
                            Delete Question
                        </button>
                    </div>

                    {/* Show Submit button on the last question */}
                    {currentQuestionIndex === questions.length - 1 && (
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        >
                            Save Quiz
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateQuiz;
