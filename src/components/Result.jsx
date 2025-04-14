import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../context/DataContext";
import BaseLayout from "./BaseLayout";
import html2canvas from 'html2canvas';
import '../styles/Result.css'

const Result = () => {
  const navigate = useNavigate();
  const { quizQuestions, quizType, marks, resetQuiz, setQuizType } = useContext(DataContext);
  const { id } = useParams();
  
  const percentage = (marks / (quizQuestions.length * 5)) * 100;
  const isPassing = marks > (quizQuestions.length * 5 / 2);
  const totalQuestions = quizQuestions.length;
  const maxPossibleScore = quizQuestions.length * 5;
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const handleStartOver = () => {
    const lastQuizType = quizType;
    navigate(`/quiz/${lastQuizType}`);
    resetQuiz();
  };

  const handleGoHome = () => {
    resetQuiz();
    navigate('/');
  };

  const handleShareResults = () => {
    html2canvas(document.body).then((canvas) => {
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `quiz-result-${id}-${currentDate}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <BaseLayout>
      <section className="text-white">
        <div className="container">
          <div className="row vh-100 align-items-center justify-content-center">
            <div className="col-lg-6">
              <div className="result-card">
                <div className="score-circle">
                  <div className={`circle-progress ${isPassing ? 'success' : 'danger'}`}>
                    <h1 className="percentage">{percentage.toFixed(0)}%</h1>
                    <p className="score-text">
                      {marks} / {maxPossibleScore} points
                    </p>
                  </div>
                </div>

                <div className="result-message mb-4">
                  {isPassing ? (
                    <>
                      <h2 className="fs-2 fw-bold text-success mb-3">🎉 Excellent Work! 🚀</h2>
                      <p className="lead fw-semibold text-light">You've demonstrated great knowledge!</p>
                    </>
                  ) : (
                    <>
                      <h2 className="fs-2 fw-bold text-danger mb-3">💪 Keep Practicing! ⌛</h2>
                      <p className="lead fw-semibold text-light">Don't give up - you're making progress!</p>
                    </>
                  )}
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <div className="stat-item">
                      <div className="stat-label">Total Questions</div>
                      <div className="stat-value">{totalQuestions}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="stat-item">
                      <div className="stat-label">Quiz Type</div>
                      <div className="stat-value">{quizType?.type || quizType || 'Custom'}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="stat-item">
                      <div className="stat-label">Completion Date</div>
                      <div className="stat-value">{currentDate}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="stat-item">
                      <div className="stat-label">Completion Time</div>
                      <div className="stat-value">{currentTime}</div>
                    </div>
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    onClick={handleStartOver}
                    className="btn btn-primary fw-bold px-4 py-2"
                  >
                    Try Again <i className="bi bi-arrow-repeat ms-2"></i>
                  </button>
                  <button
                    onClick={handleGoHome}
                    className="btn btn-secondary fw-bold px-4 py-2"
                  >
                    Go Home <i className="bi bi-house-door ms-2"></i>
                  </button>
                  <button
                    onClick={handleShareResults}
                    className="btn btn-info fw-bold px-4 py-2"
                  >
                    Share Result <i className="bi bi-share ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Result;
