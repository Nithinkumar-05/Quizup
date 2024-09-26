import React from 'react';

const Preview = ({ quizTitle, questions, onBack }) => {
    return (
        <div className="container mx-auto p-6 max-w-full w-full h-full flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl max-h-[75vh] overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">{quizTitle}</h1>
                {questions.length === 0 ? (
                    <p className="text-center text-gray-500">No questions available.</p>
                ) : (
                    questions.map((question, index) => (
                        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-2">
                                {index + 1}. {question.questionText}
                            </h2>
                            <ul className="space-y-2">
                                {question.options.map((option, i) => (
                                    <li
                                        key={i}
                                        className={`p-2 rounded-md ${i === question.correctOptionIndex ? 'bg-green-200 font-bold' : 'bg-gray-100'}`}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
                <button onClick={onBack} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Back to Edit
                </button>
            </div>
        </div>
    );
};

export default Preview;
