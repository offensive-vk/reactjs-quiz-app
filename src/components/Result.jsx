import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/dataContext";
import BaseLayout from "./BaseLayout";

const Result = () => {
  const navigate = useNavigate();
  const { showResult, quizs, marks, resetQuiz } = useContext(DataContext);
  
  // Calculate percentage for progress indicator
  const percentage = (marks / (quizs.length * 5)) * 100;
  const isPassing = marks > (quizs.length * 5 / 2);

  const handleStartOver = () => {
    resetQuiz();
    navigate('/');
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
                      {marks} / {quizs.length * 5} points
                    </p>
                  </div>
                </div>

                <div className="result-message mb-4">
                  {isPassing ? (
                    <>
                      <h2 className="fs-3 fw-bold text-success mb-2">Excellent Work! 🎉</h2>
                      <p className="text-muted fs-6">You've mastered this quiz!</p>
                    </>
                  ) : (
                    <>
                      <h2 className="fs-3 fw-bold text-danger mb-2">Keep Practicing! 💪</h2>
                      <p className="text-muted fs-6">You're on the right track!</p>
                    </>
                  )}
                </div>

                <button
                  onClick={handleStartOver}
                  className="btn btn-primary fw-semibold px-4 py-2"
                >
                  Try Again <i className="bi bi-arrow-repeat ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            .result-card {
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 8px;
              text-align: center;
            }

            .score-circle {
              width: 160px;
              height: 160px;
              margin: 0 auto;
              position: relative;
            }

            .circle-progress {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border: 6px solid;
              transition: all 0.3s ease;
            }

            .circle-progress.success {
              border-color: #198754;
            }

            .circle-progress.danger {
              border-color: #dc3545;
            }

            .percentage {
              font-size: 2.5rem;
              font-weight: bold;
              color: white;
              line-height: 1;
            }

            .score-text {
              font-size: 0.85rem;
              color: #e0e0e0;
              margin-top: 5px;
            }

            .btn-primary {
              background: #0d6efd;
              border: none;
              border-radius: 4px;
              transition: all 0.2s ease;
            }

            .btn-primary:hover {
              background: #0b5ed7;
              transform: translateY(-2px);
            }

            @media (max-width: 768px) {
              .score-circle {
                width: 140px;
                height: 140px;
              }
              
              .percentage {
                font-size: 2rem;
              }
              
              .score-text {
                font-size: 0.8rem;
              }
            }
          `}
        </style>
      </section>
    </BaseLayout>
  );
};

export default Result;
