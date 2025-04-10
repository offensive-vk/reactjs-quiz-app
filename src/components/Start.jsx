import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/dataContext";
import BaseLayout from "./BaseLayout";
import '../styles/Start.css'

const Start = () => {
  const { loadCustomQuiz, loadQuestions } = useContext(DataContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const quizTypes = [
    {
      id: 'default',
      title: 'Default Quiz',
      icon: 'https://cdn.jsdelivr.net/gh/offensive-vk/reactjs-quiz-app@master/public/internet.svg'
    },
    {
      id: 'webdev',
      title: 'Web Development',
      icon: 'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/html5/html5-original.svg'
    },
    {
      id: 'javascript',
      title: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/javascript/javascript-original.svg'
    },
    {
      id: 'react',
      title: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/react/react-original.svg'
    },
    {
      id: 'python',
      title: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/python/python-original.svg'
    },
    {
      id: 'typescript',
      title: 'Typescript',
      icon: 'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/typescript/typescript-plain.svg'
    },
    {
      id: 'docker',
      title: 'Docker',
      icon: 'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/docker/docker-original.svg'
    }
  ];

  const handleQuizStart = (type) => {
    loadQuestions(type);
    navigate(`/quiz/${type}`);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const text = await file.text();
        const jsonData = JSON.parse(text);
        loadCustomQuiz(jsonData);
      } catch (error) {
        alert('Invalid JSON file format. Please check the schema requirements.');
      }
    }
  };

  const handleDownloadSchemas = () => {
    const schemas = ['quiz.json'];
    schemas.forEach(schema => {
      const a = document.createElement('a');
      a.href = schema;
      a.download = schema.split('/').pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <BaseLayout>
      <section className="text-white text-center quiz-start">
        <div className="container">
          <div className="row vh-100 align-items-center justify-content-center">
            <div className="col-12">
              <h1 className="fw-bold m-4 display-5">Are You A Quiz Champion?</h1>
              <p className="lead mb-5">Choose your quiz type or upload a custom one!</p>

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

              {/* Previous Grid */}
              {/* <div className="quiz-options mb-5">
                <div className="quiz-types-row">
                  {quizTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleQuizStart(type.id)}
                      className="quiz-type-card"
                    >
                      <div className="quiz-icon-wrapper">
                        <img 
                          src={type.icon} 
                          alt={type.title}
                          className="quiz-icon-svg"
                        />
                      </div>
                      <h3 className="quiz-type-title">{type.title}</h3>
                    </button>
                  ))}
                </div>
              </div> */}

              <div className="custom-quiz-section mt-5">
                <p className="text-white mb-3">Or upload your custom quiz</p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="btn btn-outline-light btn-lg upload-btn"
                >
                  <i className="bi bi-upload me-2"></i>
                  Upload Quiz JSON
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  className="d-none"
                  onChange={handleFileUpload}
                />
                <div className="mt-3">
                  <button
                    className="btn template border rounded p-2 m-4"
                    onClick={handleDownloadSchemas}
                  >
                    <small>Download Template</small>
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

export default Start;
