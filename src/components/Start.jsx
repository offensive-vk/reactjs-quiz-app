import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/dataContext";
import BaseLayout from "./BaseLayout";
import NavLinks from "./NavLinks";
import '../styles/Start.css'
import { getAllQuizTypes } from "../data/quizTypes";
import Loading from './Loading';

const Start = () => {
  const { loadQuestions } = useContext(DataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const quizTypes = getAllQuizTypes();

  const handleQuizStart = (type) => {
    setLoading(true);
    loadQuestions(type);
    setTimeout(() => {
      navigate(`/quiz/${type}`);
      setLoading(false);
    }, 2000);
  };

  const handleCustomQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/custom-quiz');
      setLoading(false);
    }, 2000);
  };

  if (loading) return <Loading />;

  return (
    <BaseLayout>
      <section className="text-white text-center quiz-start">
        <div className="container">
          <NavLinks handleCustomQuiz={handleCustomQuiz} />
          <div className="row vh-100 align-items-center justify-content-center">
            <div className="col-12">
              <h1 className="fw-bold m-4 display-5">Are you a Tech Quiz Champion?</h1>
              <p className="lead mb-5">Choose your quiz type or create your own!</p>

              <div className="quiz-options mb-5 mx-5">
                <div className="quiz-types-grid">
                  {/* First item - full-width row */}
                  {quizTypes.length > 0 && (
                    <button
                      key={quizTypes[0].id}
                      onClick={() => handleQuizStart(quizTypes[0].id)}
                      className="quiz-type-card big-card"
                      data-type={quizTypes[0].id}
                    >
                      <div className="quiz-icon-wrapper" >
                        <img src={quizTypes[0].icon} alt={quizTypes[0].title} className="quiz-icon-svg" />
                      </div>
                      <h3 className="quiz-type-title">{quizTypes[0].title}</h3>
                    </button>
                  )}

                  <div className="quiz-type-grid-remaining">
                    {quizTypes.slice(1).map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleQuizStart(type.id)}
                        className="quiz-type-card"
                        data-type={type.id}
                      >
                        <div className="quiz-icon-wrapper">
                          <img src={type.icon} alt={type.title} className="quiz-icon-svg" />
                        </div>
                        <h3 className="quiz-type-title">{type.title}</h3>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="custom-quiz-section mt-5 mb-5">
                <button
                  onClick={handleCustomQuiz}
                  className="btn btn-outline-light btn-lg custom-quiz-btn"
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Create Custom Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Start;
