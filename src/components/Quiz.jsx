import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DataContext from "../context/dataContext";
import BaseLayout from "./BaseLayout";
import '../styles/Quiz.css'

const Quiz = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, quizTitle } = location.state || {};

  const {
    question,
    quizQuestions,
    checkAnswer,
    correctAnswer,
    selectedAnswer,
    questionIndex,
    loadQuestions,
    showResult,
    setShowResult,
    setShowQuiz,
    generateId,
    quizType,
    skipQuestion,
    setQuizType,
    resetQuiz
  } = useContext(DataContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (questions) {
      setQuizType('custom');
      setIsLoading(false);
    } else {
      const loadQuiz = async () => {
        try {
          await loadQuestions(type || quizType);
          setQuizType(type || quizType);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to load quiz:', error);
          navigate('/');
        }
      };
      loadQuiz();
    }
  }, [type, questions]);

  useEffect(() => {
    if (showResult) {
      const resultId = generateId();
      const resultPath = `/result/${resultId}`;
      navigate(resultPath);
    }
  }, [showResult, navigate]);

  const handleEndQuiz = () => {
    if (window.confirm('Are you sure you want to end the quiz? Your progress will be saved.')) {
      const resultId = generateId();
      setShowResult(true);
      setShowQuiz(false);
      const resultPath = `/result/${resultId}`;
      navigate(resultPath);
      resetQuiz();
    }
  };

  if (isLoading) {
    return (
      <BaseLayout>
        <div className="text-white text-center vh-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <section className="text-white">
        <div className="container">
          <div className="row min-vh-100 align-items-center justify-content-center py-4">
            <div className="col-12 col-lg-8">
              <div className="question-card p-4">
                <div className="quiz-header mb-4">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                    <div className="quiz-info d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 gap-md-3">
                      <span className="question-number">Q{questionIndex + 1}</span>
                      <span className="quiz-type-badge" data-type={type || quizTitle || 'default'}>
                        {(type && type.charAt(0).toUpperCase() + type.slice(1)) || quizTitle || 'Default'} Quiz
                      </span>
                      {quizType === 'custom' && question?.marks && (
                        <span className="marks-badge">{question.marks} marks</span>
                      )}
                    </div>
                    <div className="d-flex gap-2 w-100 w-md-auto justify-content-start justify-content-md-end">
                      <button 
                        onClick={skipQuestion}
                        className="btn btn-outline-light"
                      >
                        <i className="bi bi-skip-forward me-2"></i>
                        Skip
                      </button>
                      <button 
                        onClick={handleEndQuiz}
                        className="btn-end-quiz"
                      >
                        <i className="bi bi-x-circle me-2"></i>
                        End Quiz
                      </button>
                    </div>
                  </div>
                </div>

                <div className="quiz-progress mb-4">
                  <div className="d-flex justify-content-start mb-2">
                    <span className="question-counter fw-medium">Question {questionIndex + 1} of {quizQuestions.length}</span>
                  </div>
                  <div className="progress" style={{ height: "7px" }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h4 className="mb-4 question-text">{question?.question}</h4>
                <div className="options-container">
                  {question?.choices?.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => checkAnswer(choice, index)}
                      className={`quiz-option w-100 text-start mb-3 p-3 ${
                        selectedAnswer === choice 
                          ? correctAnswer === ""
                            ? "selected"
                            : correctAnswer === choice
                            ? "correct"
                            : "wrong"
                          : ""
                      } ${correctAnswer === choice ? "correct" : ""}`}
                      disabled={correctAnswer !== ""}
                    >
                      <span className="option-index me-3">{String.fromCharCode(65 + index)}.</span>
                      <span className="option-text">{choice}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Quiz;