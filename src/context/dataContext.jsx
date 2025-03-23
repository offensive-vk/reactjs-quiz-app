import React, { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  
  // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [marks, setMarks] = useState(0);

  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [quizType, setQuizType] = useState('webdev');

  // Load JSON Data
  // useEffect(() => {
  //   fetch("quiz.json")
  //     .then((res) => res.json())
  //     .then((data) => setQuizs(data));
  // }, []);

  // Set a Single Question
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  const loadCustomQuiz = (jsonData) => {
    // Validate JSON structure here
    if (isValidQuizFormat(jsonData)) {
      setQuizs(jsonData.questions);
      startQuiz();
    } else {
      alert('Invalid quiz format. Please check the schema requirements.');
    }
  };

  const startQuiz = (type = 'webdev') => {
    setQuizType(type);
    setShowStart(false);
    setShowQuiz(true);
    // Load questions based on quiz type
    loadQuestions(type);
  };

  const loadQuestions = async (type) => {
    try {
      const response = await fetch(`/data/${type}-questions.json`);
      const data = await response.json();
      setQuizs(data.questions);
      setQuestion(data.questions[0]);
      setShowStart(false);
      setShowQuiz(true);
      setShowResult(false);
    } catch (error) {
      console.error('Error loading questions:', error);
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
    setQuizs([]);
    resetQuizState();
  };

  // Check Answer
  const checkAnswer = (choice, index) => {
    if (correctAnswer === "") { // Only allow selection if no answer is selected yet
      setSelectedAnswer(choice);
      if (index === question.correctAnswer) {
        setMarks(marks + 5);
        setCorrectAnswer(choice);
      } else {
        setCorrectAnswer(question.choices[question.correctAnswer]);
      }
      
      // Move to next question after a delay
      setTimeout(() => {
        if (questionIndex === quizs.length - 1) {
          setShowResult(true);
          setShowQuiz(false);
        } else {
          setQuestionIndex(questionIndex + 1);
          setQuestion(quizs[questionIndex + 1]);
          setSelectedAnswer("");
          setCorrectAnswer("");
        }
      }, 1500);
    }
  };

  // Next Quesion
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
  return (
    <DataContext.Provider
      value={{
        startQuiz,
        showStart,
        showQuiz,
        question,
        quizs,
        checkAnswer,
        correctAnswer,
        selectedAnswer,
        questionIndex,
        nextQuestion,
        showTheResult,
        showResult,
        marks,
        startOver,
        loadCustomQuiz,
        quizType,
        loadQuestions,
        resetQuiz,
        setShowResult,
        setShowQuiz,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
