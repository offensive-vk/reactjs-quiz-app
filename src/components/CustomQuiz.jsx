import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import DataContext from '../context/dataContext';
import '../styles/CustomQuiz.css';

const CustomQuiz = () => {
    const {
        questions, 
        setQuestions
    } = useContext(DataContext);

    const [quizTitle, setQuizTitle] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        choices: ['', '', '', ''],
        correctIndex: 0
    });
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
            correctIndex: 0
        });
    };

    const handleEditQuestion = (index) => {
        setCurrentQuestion(questions[index]);
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleDeleteQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
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
            correctAnswer: q.correctIndex // This matches what Quiz component expects
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

    return (
        <BaseLayout>
            <div className="question-editor">
                <h2 className="text-center mb-4">Create Your Custom Quiz</h2>
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
                    <select
                        value={currentQuestion.correctIndex}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctIndex: parseInt(e.target.value) })}
                        className="form-control mb-3"
                    >
                        {currentQuestion.choices.map((_, index) => (
                            <option key={index} value={index}>Correct Answer: Choice {index + 1}</option>
                        ))}
                    </select>
                    <button onClick={handleAddQuestion} className="btn btn-primary mb-4">Add Question</button>
                </div>

                <div className="questions-list mb-4">
                    {questions.map((q, index) => (
                        <div key={index} className="question-item p-3 mb-2">
                            <h5>{q.question}</h5>
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
            </div>
        </BaseLayout>
    );
};

export default CustomQuiz;