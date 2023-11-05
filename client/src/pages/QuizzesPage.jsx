import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";

export default function QuizzesPage() {
    const questions = [
        {
            question: "What does 'ROI' stand for in the context of investments?",
            options: ["Return on Investment", "Rate of Inflation", "Risk of Investment", "Real Opportunity Income"],
            correctAnswer: "Return on Investment",
        },
        {
            question: "How does diversifying your investments reduce risk?",
            options: ["It increases risk", "It has no effect on risk", "It decreases risk by spreading investments across different asset classes", "It guarantees returns"],
            correctAnswer: "It decreases risk by spreading investments across different asset classes",
        },
        {
            question: "What is an emergency fund, and why is it important for financial security?",
            options: ["A fund used for luxury purchases", "A fund for vacations", "A fund for unexpected expenses and emergencies", "A fund for retirement"],
            correctAnswer: "A fund for unexpected expenses and emergencies",
        },
        {
            question: "Why is it essential to have a budget when managing your finances?",
            options: ["To spend money freely", "To track expenses and savings", "To avoid saving money", "To invest without a plan"],
            correctAnswer: "To track expenses and savings",
        },
        {
            question: "What is the 'golden rule' of saving money?",
            options: ["Spend all your income", "Save only when you have excess money", "Save at least 10% of your income", "Never save money"],
            correctAnswer: "Save at least 10% of your income",
        },
    ];


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleAnswerSelect = (selectedOption) => {
        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 10); // Increase the score by 10 for each correct answer.
        }
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestionIndex] = selectedOption;
        setUserAnswers(updatedUserAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = () => {
        setQuizCompleted(true);
    };

    const calculatePercentageScore = () => {
        return (score / (questions.length * 10)) * 100;
    };

    const showSuccessMessage = calculatePercentageScore() > 70;

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers(Array(questions.length).fill(null));
        setScore(0);
        setQuizCompleted(false);
    };

    const getScoreMessage = (score) => {
        if (score === 100) {
            return "Congratulations! You earned a special prize for a perfect score!";
        } else if (score >= 90) {
            return "Great job! You received a valuable reward for scoring 90% or higher.";
        } else if (score >= 70) {
            return "Well done! You get a small gift for scoring 70% or higher.";
        } else if (score >= 50) {
            return "Not too shabby! Here's a token of appreciation for scoring 50% or higher.";
        } else if (score >= 35) {
            return "Good effort! You receive a small reward for scoring above 35%.";
        } else {
            return "Better luck next time. No prize this time, but keep practicing!";
        }
    };


    return (
        <div className='min-h-screen bg-black/80 flex flex-col'>
            <NavBar />
            <div className='bg-gradient-to-b from-blue-700 to-blue-900 text-white py-10 text-center'>
                <h1 className="text-4xl font-semibold">Quiz Time</h1>
                <p className="text-lg mt-4">Welcome to <b>Quiz Time</b>. Test your knowledge and challenge yourself with our exciting quiz game. See how many questions you can answer correctly. If you score more than 70, something special will happen!</p>
            </div>
            <div className="text-white flex justify-center quiz-container flex-grow py-6">
                {quizCompleted ? (
                    <div className="quiz-completed text-center">
                        <h2 className="text-2xl font-semibold">Quiz Completed</h2>
                        <p className="text-lg mt-4">Your Score: {calculatePercentageScore()}%</p>
                        <p className="text-lg mt-4">{getScoreMessage(calculatePercentageScore())}</p>
                        <button
                            onClick={resetQuiz}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                        >
                            Reset Quiz
                        </button>
                        <Link className="p-2" to={'/games'}>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                            >
                                Back to Game
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="quiz-question text-center">
                        <h2 className="text-2xl font-semibold">{questions[currentQuestionIndex].question}</h2>
                        <ul className="mt-4">
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <li key={index} className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value={option}
                                            checked={userAnswers[currentQuestionIndex] === option}
                                            onChange={() => handleAnswerSelect(option)}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <div className="quiz-navigation mt-6">
                            {currentQuestionIndex > 0 && (
                                <button onClick={handlePreviousQuestion} className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4">Previous</button>
                            )}
                            {currentQuestionIndex < questions.length - 1 && (
                                <button onClick={handleNextQuestion} className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4">Next</button>
                            )}
                            {currentQuestionIndex === questions.length - 1 && (
                                <button onClick={handleSubmitQuiz} className="bg-green-600 text-white px-4 py-2 rounded-md">Submit</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
