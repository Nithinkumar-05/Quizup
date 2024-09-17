import { useState, useEffect } from 'react';
import axios from 'axios';

const Preview = ({ quizId }) => {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseurl = import.meta.env.REACT_APP_BASE_URL || "http://localhost:1000";

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`${baseurl}/host/getQuiz/${quizId}`);
                setQuiz(response.data.quiz); // Access the nested quiz data
            } catch (error) {
                setError('Error fetching quiz.');
                console.error('Error fetching quiz:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId]);

    if (loading) return <p className="text-center text-gray-500">Loading quiz...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!quiz) return <p className="text-center text-gray-500">No quiz found.</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">{quiz.title}</h1>
            {quiz.questions.length === 0 ? (
                <p className="text-center text-gray-500">No questions available.</p>
            ) : (
                quiz.questions.map((question, index) => (
                    <div key={question._id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-2">{index + 1}. {question.questionText}</h2>
                        <ul className="space-y-2">
                            {question.options.map((option, i) => (
                                <li
                                    key={i}
                                    className={`p-2 rounded-md ${
                                        i === question.correctOptionIndex ? 'bg-green-200 font-bold' : 'bg-gray-100'
                                    }`}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default Preview;
