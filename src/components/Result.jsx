import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../context/dataContext";
import BaseLayout from "./BaseLayout";
import html2canvas from 'html2canvas';
import '../styles/Result.css'

const Result = () => {
  const navigate = useNavigate();
  const { quizQuestions, quizType, marks, resetQuiz, setQuizType } = useContext(DataContext);
  const { id } = useParams();
  
  // Calculate percentage for progress indicator
  const percentage = (marks / (quizQuestions.length * 5)) * 100;
  const isPassing = marks > (quizQuestions.length * 5 / 2);

  const handleStartOver = () => {
    // Assuming the quiz type is stored in the quizType array and is the last string path in the URL
    // const lastQuizType = quizType[0]?.type;
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
      link.download = `quiz-result-${id}.png`;
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
              <div className="result-card p-4">
                <div className="score-circle mb-3">
                  <div className={`circle-progress ${isPassing ? 'success' : 'danger'}`}>
                    <h1 className="percentage mb-0">{percentage.toFixed(0)}%</h1>
                    <p className="score-text">
                      {marks} / {quizQuestions.length * 5} points
                    </p>
                  </div>
                </div>

                <div className="result-message mb-4">
                  {isPassing ? (
                    <>
                      <h2 className="fs-3 fw-bold text-success mb-2">🚀 Excellent Work! 🎉</h2>
                      <p className="text-muted">You've mastered this quiz!</p>
                    </>
                  ) : (
                    <>
                      <h2 className="fs-3 fw-bold text-danger mb-2">⌛ Keep Practicing! 💪</h2>
                      <p className="text-muted">You're on the right track!</p>
                    </>
                  )}
                </div>

                <div className="result-details mb-4">
                  <p className="quiz-info">Quiz Type: {quizType?.type || quizType}</p>
                  <p className="quiz-info">Quiz URL: {window.location?.href}</p>
                </div>

                <button
                  onClick={handleStartOver}
                  className="btn btn-primary fw-semibold px-4 py-2 me-2"
                >
                  Try Again <i className="bi bi-arrow-repeat ms-2"></i>
                </button>
                <button
                  onClick={handleGoHome}
                  className="btn btn-secondary fw-semibold px-4 py-2 me-2"
                >
                  Go Home <i className="bi bi-house-door ms-2"></i>
                </button>
                <button
                  onClick={handleShareResults}
                  className="btn btn-info fw-semibold px-4 py-2"
                >
                  Share Result <i className="bi bi-share ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Result;
