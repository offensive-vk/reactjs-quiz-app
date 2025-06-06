import React, { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [question, setQuestion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [marks, setMarks] = useState(0);
    const [skippedQuestions, setSkippedQuestions] = useState(0);
    const [quizError, setQuizError] = useState(null);

    // Display Controlling States
    const [showStart, setShowStart] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [quizType, setQuizType] = useState('default');

    // Add cache for quiz data
    const [questionCache, setQuestionCache] = useState({});

    useEffect(() => {
        if (quizQuestions.length > questionIndex) {
            setQuestion(quizQuestions[questionIndex]);
        }
    }, [quizQuestions, questionIndex]);

    const isValidQuizFormat = (questions) => {
        if (!Array.isArray(questions)) {
            throw new Error('Questions must be an array');
        }
        
        return questions.every((question, index) => {
            if (typeof question.question !== 'string') {
                throw new Error(`Question ${index + 1}: question must be a string`);
            }
            
            if (!Array.isArray(question.choices)) {
                throw new Error(`Question ${index + 1}: choices must be an array`);
            }
            
            if (question.choices.length !== 4) {
                throw new Error(`Question ${index + 1}: must have exactly 4 choices`);
            }
            
            if (!question.choices.every(choice => typeof choice === 'string')) {
                throw new Error(`Question ${index + 1}: all choices must be strings`);
            }
            
            if (typeof question.correctAnswer !== 'number' && typeof question.correctIndex !== 'number') {
                throw new Error(`Question ${index + 1}: must have either correctAnswer or correctIndex as a number`);
            }
            
            if (question.correctAnswer !== undefined && (question.correctAnswer < 0 || question.correctAnswer > 3)) {
                throw new Error(`Question ${index + 1}: correctAnswer must be between 0 and 3`);
            }
            
            if (question.correctIndex !== undefined && (question.correctIndex < 0 || question.correctIndex > 3)) {
                throw new Error(`Question ${index + 1}: correctIndex must be between 0 and 3`);
            }
            
            return true;
        });
    };

    const loadQuestions = async (type) => {
        try {
            setQuizError(null);
            
            // Check cache first
            if (questionCache[type]) {
                setQuizQuestions(questionCache[type]);
                setQuestion(questionCache[type][0]);
                setShowStart(false);
                setShowQuiz(true);
                return;
            }

            const response = await fetch(`/data/${type}-questions.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Shuffle questions
            const shuffledQuestions = data.questions.sort(() => Math.random() - 0.5);
            
            // Cache the questions
            setQuestionCache(prev => ({
                ...prev,
                [type]: shuffledQuestions
            }));
            
            setQuizQuestions(shuffledQuestions);
            setQuestion(shuffledQuestions[0]);
            setShowStart(false);
            setShowQuiz(true);
        } catch (error) {
            console.error('Error loading questions:', error);
            setQuizError(error.message);
            setShowQuiz(false);
        }
    };

    const loadCustomQuiz = (jsonData) => {
        try {
            setQuizError(null);
            isValidQuizFormat(jsonData);
            
            const normalizedQuestions = jsonData.map(q => ({
                ...q,
                correctAnswer: q.correctAnswer !== undefined ? q.correctAnswer : q.correctIndex
            }));
            
            setQuizQuestions(normalizedQuestions);
            setQuestion(normalizedQuestions[0]);
            setShowStart(false);
            setShowQuiz(true);
            setShowResult(false);
        } catch (error) {
            console.error('Error loading custom quiz:', error);
            setQuizError(error.message);
            setShowQuiz(false);
        }
    };

    const startQuiz = (type, jsonData) => {
        setQuizType(type);
        if (jsonData) {
            loadCustomQuiz(jsonData);
        } else {
            setShowStart(false);
            setShowQuiz(true);
            loadQuestions(type);
        }
    };

    const resetQuizState = () => {
        setQuestionIndex(0);
        setCorrectAnswer("");
        setSelectedAnswer("");
        setMarks(0);
        setShowResult(false);
    };

    const resetQuiz = () => {
        setQuizQuestions([]);
        resetQuizState();
    };

    // Check Answer
    const checkAnswer = (choice, index) => {
        if (index === -1) {
            // Handle skipped question
            setSkippedQuestions(prev => prev + 1);
            if (questionIndex === quizQuestions.length - 1) {
                setShowResult(true);
                setShowQuiz(false);
                setShowStart(false);
            } else {
                setQuestionIndex(questionIndex + 1);
                setQuestion(quizQuestions[questionIndex + 1]);
            }
            return;
        }

        if (correctAnswer === "") {
            setSelectedAnswer(choice);
            
            const correctAnswerIndex = question.correctAnswer !== undefined ? 
                question.correctAnswer : 
                question.correctIndex;
            
            if (index === correctAnswerIndex) {
                const questionMarks = question.marks || 5;
                setMarks(marks + questionMarks);
                setCorrectAnswer(choice);
            } else {
                setCorrectAnswer(question.choices[correctAnswerIndex]);
            }

            // Move to next question after a delay
            setTimeout(() => {
                setCorrectAnswer((prevCorrectAnswer) => {
                    if (questionIndex === quizQuestions.length - 1) {
                        setShowResult(true);
                        setShowQuiz(false);
                        setShowStart(false);
                        return prevCorrectAnswer; // Keep the correct answer for result display
                    } else {
                        setQuestionIndex((prevIndex) => prevIndex + 1);
                        setQuestion(quizQuestions[questionIndex + 1]);
                        setSelectedAnswer("");
                        return ""; // Reset correct answer for the next question
                    }
                });
            }, 1000);
        }
    };

    const skipQuestion = () => {
        checkAnswer(null, -1);
    };

    // Next Question
    const nextQuestion = () => {
        setCorrectAnswer("");
        setSelectedAnswer("");
        const wrongBtn = document.querySelector("button.bg-danger");
        wrongBtn?.classList.remove("bg-danger");
        const rightBtn = document.querySelector("button.bg-success");
        rightBtn?.classList.remove("bg-success");
        setQuestionIndex(questionIndex + 1);
    };

    // Show Result
    const showTheResult = () => {
        setShowResult(true);
        setShowStart(false);
        setShowQuiz(false);
    };

    // Start Over
    const startOver = () => {
        setShowStart(false);
        setShowResult(false);
        setShowQuiz(true);
        setCorrectAnswer("");
        setSelectedAnswer("");
        setQuestionIndex(0);
        setMarks(0);
        const wrongBtn = document.querySelector("button.bg-danger");
        wrongBtn?.classList.remove("bg-danger");
        const rightBtn = document.querySelector("button.bg-success");
        rightBtn?.classList.remove("bg-success");
    };

    function generateId(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    return (
        <DataContext.Provider
            value={{
                showStart,
                showQuiz,
                question,
                quizQuestions,
                correctAnswer,
                selectedAnswer,
                questionIndex,
                showResult,
                marks,
                quizType,
                skippedQuestions,
                quizError,
                startQuiz,
                nextQuestion,
                showTheResult,
                checkAnswer,
                skipQuestion,
                startOver,
                loadCustomQuiz,
                loadQuestions,
                resetQuiz,
                setShowResult,
                setShowQuiz,
                setQuizType,
                generateId,
                questions: quizQuestions,
                setQuestions: setQuizQuestions,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
