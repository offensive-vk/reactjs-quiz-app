import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import DataContext from '../context/dataContext';
import ErrorFallback from './Error';
import '../styles/CustomQuiz.css';

const CustomQuiz = () => {
    const {
        questions, 
        setQuestions,
        loadCustomQuiz,
        quizError
    } = useContext(DataContext);

    const [quizTitle, setQuizTitle] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        choices: ['', '', '', ''],
        correctIndex: 0,
        marks: Infinity
    });
    const [jsonInput, setJsonInput] = useState('');
    const [showJsonInput, setShowJsonInput] = useState(false);
    const [localError, setLocalError] = useState(null);
    const navigate = useNavigate();

    const generateRandomRoute = () => {
        return 'quiz-' + Math.random().toString(36).substring(2, 8);
    };

    const createUrlFriendlyTitle = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleAddQuestion = () => {
        // Validate all fields
        if (currentQuestion.question.trim() === '' || 
            currentQuestion.choices.some(choice => choice.trim() === '')) {
            alert('Please fill in all fields before adding a question.');
            return;
        }

        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            question: '',
            choices: ['', '', '', ''],
            correctIndex: 0,
            marks: 10
        });
    };

    const handleEditQuestion = (index) => {
        setCurrentQuestion(questions[index]);
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleDeleteQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleJsonSubmit = () => {
        try {
            setLocalError(null);
            const jsonData = JSON.parse(jsonInput);
            
            if (!jsonData.questions || !Array.isArray(jsonData.questions)) {
                throw new Error('Invalid JSON format: missing or invalid questions array');
            }
            
            // Ensure each question has a marks field
            const questionsWithMarks = jsonData.questions.map(q => ({
                ...q,
                marks: q.marks || 10
            }));
            
            // Store in localStorage
            localStorage.setItem('customQuizData', JSON.stringify({
                ...jsonData,
                questions: questionsWithMarks
            }));
            
            loadCustomQuiz(questionsWithMarks);
            
            const routePath = jsonData.quizTitle 
                ? createUrlFriendlyTitle(jsonData.quizTitle)
                : generateRandomRoute();

            navigate(`/custom/${routePath}`, { 
                state: { 
                    questions: questionsWithMarks,
                    quizTitle: jsonData.quizTitle || `Custom Quiz #${routePath}` 
                } 
            });
        } catch (error) {
            setLocalError(error.message);
        }
    };

    const handleStartQuiz = () => {
        if (questions.length === 0) {
            alert('Please add at least one question before starting the quiz.');
            return;
        }

        const routePath = quizTitle.trim() 
            ? createUrlFriendlyTitle(quizTitle)
            : generateRandomRoute();

        // Format questions to match expected schema
        const formattedQuestions = questions.map(q => ({
            question: q.question,
            choices: q.choices,
            correctAnswer: q.correctIndex,
            marks: q.marks || 10
        }));

        navigate(`/custom/${routePath}`, { 
            state: { 
                questions: formattedQuestions,
                quizTitle: quizTitle.trim() || `Custom Quiz #${routePath}` 
            } 
        });
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
            navigate('/');
        }
    };

    // If there's an error, show the error component
    if (quizError || localError) {
        return <ErrorFallback error={quizError || localError} />;
    }

    return (
        <BaseLayout>
            <div className="question-editor">
                <h2 className="text-center mb-2 mt-2">{quizTitle || "Create Your Custom Quiz"}</h2>
                <div className="d-flex justify-content-center mb-4 mt-4">
                    <button 
                        className={`btn ${showJsonInput ? 'btn-secondary' : 'btn-primary'} me-2`}
                        onClick={() => setShowJsonInput(!showJsonInput)}
                    >
                        {showJsonInput ? 'Use Form Editor' : 'Use JSON Input'}
                    </button>
                </div>

                {showJsonInput ? (
                    <div className="json-input-section mb-4">
                        <h4 className="mb-3">Paste Your Quiz JSON</h4>
                        <textarea
                            className="form-control mb-3"
                            rows="10"
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            placeholder={`{
  "quizTitle": "Your Quiz Title",
  "questions": [
    {
      "question": "Your question here",
      "choices": ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      "correctAnswer": 0,
      "marks": 10
    }
  ]
}`}
                        />
                        <div className="d-flex justify-content-center gap-3">
                            <button onClick={handleJsonSubmit} className="btn btn-success">Load Quiz</button>
                            <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Quiz Title (optional)"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            className="form-control mb-4"
                        />
                        <div className="question-form">
                            <input
                                type="text"
                                placeholder="Enter your question"
                                value={currentQuestion.question}
                                onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                                className="form-control mb-3"
                            />
                            {currentQuestion.choices.map((choice, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder={`Choice ${index + 1}`}
                                    value={choice}
                                    onChange={(e) => {
                                        const newChoices = [...currentQuestion.choices];
                                        newChoices[index] = e.target.value;
                                        setCurrentQuestion({ ...currentQuestion, choices: newChoices });
                                    }}
                                    className="form-control mb-2"
                                />
                            ))}
                            <div className="d-flex gap-3 mb-3">
                                <select
                                    value={currentQuestion.correctIndex}
                                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctIndex: parseInt(e.target.value) })}
                                    className="form-control"
                                >
                                    {currentQuestion.choices.map((_, index) => (
                                        <option key={index} value={index}>Correct Answer: Choice {index + 1}</option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    placeholder="marks"
                                    value={currentQuestion.marks}
                                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, marks: parseInt(e.target.value) })}
                                    className="form-control"
                                    min="1"
                                />
                            </div>
                            <button onClick={handleAddQuestion} className="btn btn-primary mb-4">Add Question</button>
                        </div>

                        <div className="questions-list mb-4">
                            {questions.map((q, index) => (
                                <div key={index} className="question-item p-3 mb-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>{q.question}</h5>
                                        <span className="badge bg-primary">{q.marks} marks</span>
                                    </div>
                                    <div className="choices-list mb-2">
                                        {q.choices.map((choice, choiceIndex) => (
                                            <div key={choiceIndex} className={`choice-item ${choiceIndex === q.correctIndex ? 'correct-choice' : ''}`}>
                                                {choice}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="button-group">
                                        <button onClick={() => handleEditQuestion(index)} className="btn btn-warning me-2">Edit</button>
                                        <button onClick={() => handleDeleteQuestion(index)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <button onClick={handleStartQuiz} className="btn btn-success">Start Quiz</button>
                            <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                        </div>
                    </>
                )}
            </div>
        </BaseLayout>
    );
};

export default CustomQuiz;