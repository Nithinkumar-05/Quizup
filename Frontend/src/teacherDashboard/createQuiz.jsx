import { useState } from 'react';
import axios from 'axios';
import Preview from './Preview';

// Modal Component
const Modal = ({ quizLink, onClose, quizId }) => {
    const [showPreview, setShowPreview] = useState(false);

    const handlePreview = () => {
        setShowPreview(true);
        localStorage.setItem("index",4);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-md p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Quiz Created Successfully!</h2>
                <p className="text-gray-700 mb-4">Your quiz link is:</p>
                <p className="bg-gray-100 p-3 rounded-md mb-4">{quizLink}</p>
                {showPreview ? (
                    <Preview quizId={quizId} />
                ) : (
                    <>
                        <button
                            onClick={handlePreview}
                            className="bg-gray-500 text-white py-2 px-3 rounded-sm hover:bg-gray-700"
                        >
                            Preview
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// CreateQuiz Component
const CreateQuiz = () => {
    const baseurl = import.meta.env.REACT_APP_BASE_URL || "http://localhost:1000";
    const [quizTitle, setQuizTitle] = useState("");
    const [questions, setQuestions] = useState([
        { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 }
    ]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizLink, setQuizLink] = useState("");
    const [quizId, setQuizId] = useState();

    const isQuestionIncomplete = (question) => {
        return (
            !question ||
            question.questionText === "" ||
            question.options.some((option) => option === "") ||
            question.correctOptionIndex === null
        );
    };

    const handleTitleChange = (value) => {
        setQuizTitle(value);
    };

    const handleQuestionChange = (value) => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[currentQuestionIndex]) {
            updatedQuestions[currentQuestionIndex].questionText = value;
            setQuestions(updatedQuestions);
        }
    };

    const handleOptionChange = (optIndex, value) => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[currentQuestionIndex]) {
            updatedQuestions[currentQuestionIndex].options[optIndex] = value;
            setQuestions(updatedQuestions);
        }
    };

    const handleCorrectOptionChange = (value) => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[currentQuestionIndex]) {
            updatedQuestions[currentQuestionIndex].correctOptionIndex = parseInt(value);
            setQuestions(updatedQuestions);
        }
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 }
        ]);
        setCurrentQuestionIndex(questions.length);
    };

    const handleDeleteQuestion = (index) => {
        const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(updatedQuestions);
        setCurrentQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const handleAddOption = () => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[currentQuestionIndex]) {
            updatedQuestions[currentQuestionIndex].options.push("");
            setQuestions(updatedQuestions);
        }
    };

    const handleRemoveOption = (optIndex) => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[currentQuestionIndex]) {
            updatedQuestions[currentQuestionIndex].options.splice(optIndex, 1);
            setQuestions(updatedQuestions);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        const quizData = {
            title: quizTitle,
            questions: questions,
            creator: userId
        };

        try {
            const response = await axios.post(`${baseurl}/host/createQuiz`, quizData);

            if (response.status === 201) {
                setShowSuccessModal(true);
                setQuizLink(`${baseurl}/host/${response.data.quiz._id}`);
                setQuizId(response.data.quiz._id);
                clearForm();
            }
        } catch (error) {
            alert("Unknown error");
            console.log(error.message);
        }
    };

    const clearForm = () => {
        setQuizTitle("");
        setQuestions([{ questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 }]);
    };

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
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Question {currentQuestionIndex + 1}</label>
                        <input
                            type="text"
                            value={questions[currentQuestionIndex]?.questionText || ""}
                            onChange={(e) => handleQuestionChange(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your question"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Options</label>
                        {questions[currentQuestionIndex]?.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(optIndex, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder={`Option ${optIndex + 1}`}
                                    required
                                />
                                {questions[currentQuestionIndex]?.options.length > 2 && (
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

                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Correct Option</label>
                        <select
                            value={questions[currentQuestionIndex]?.correctOptionIndex || 0}
                            onChange={(e) => handleCorrectOptionChange(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                        >
                            {questions[currentQuestionIndex]?.options.map((_, optIndex) => (
                                <option key={optIndex} value={optIndex}>
                                    Option {optIndex + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400"
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>

                    <div className="flex space-x-2">
                        {currentQuestionIndex === questions.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Add Question
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
                            disabled={questions.length === 1}
                        >
                            Delete Question
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Submit Quiz
                    </button>
                </div>
            </form>

            {showSuccessModal && (
                <Modal quizLink={quizLink} onClose={() => setShowSuccessModal(false)} quizId={quizId} />
            )}
        </div>
    );
};

export default CreateQuiz;
