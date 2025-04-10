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

  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizType, setQuizType] = useState('default');

  useEffect(() => {
    if (quizQuestions.length > questionIndex) {
      setQuestion(quizQuestions[questionIndex]);
    }
  }, [quizQuestions, questionIndex]);

  const isValidQuizFormat = (jsonData) => {
    if (!Array.isArray(jsonData)) {
      return false;
    }

    // Check each question object in the array
    return jsonData.every(question => {
      return (
        typeof question.id === 'string' &&
        typeof question.question === 'string' &&
        Array.isArray(question.options) &&
        question.options.every(option => typeof option === 'string') &&
        typeof question.answer === 'string'
      );
    });
  };

  const loadQuestions = async (type) => {
    try {
      const response = await fetch(`/data/${type}-questions.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQuizQuestions(data.questions);
      setQuestion(data.questions[0].question);
      setShowStart(false);
      setShowQuiz(true);
      setShowResult(false);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const loadCustomQuiz = (jsonData) => {
    if (isValidQuizFormat(jsonData)) {
      setQuizQuestions(jsonData);
      startQuiz();
    } else {
      alert('Invalid quiz format. Please check the schema requirements.');
    }
  };

  const startQuiz = (type) => {
    setQuizType(type);
    setShowStart(false);
    setShowQuiz(true);
    loadQuestions(type);
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
      if (index === question.correctAnswer) {
        setMarks(marks + 5);
        setCorrectAnswer(choice);
      } else {
        setCorrectAnswer(question.choices[question.correctAnswer]);
      }
      
      // Move to next question after a delay
      setTimeout(() => {
        if (questionIndex === quizQuestions.length - 1) {
          setShowResult(true);
          setShowQuiz(false);
          setShowStart(false);
        } else {
          setQuestionIndex(questionIndex + 1);
          setQuestion(quizQuestions[questionIndex + 1]);
          setSelectedAnswer("");
          setCorrectAnswer("");
        }
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
