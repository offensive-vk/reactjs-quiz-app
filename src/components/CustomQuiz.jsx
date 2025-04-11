import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import '../styles/CustomQuiz.css';

const QuestionEditor = () => {
    const [questions, setQuestions] = useState([]);
    const [quizTitle, setQuizTitle] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState({ question: '', choices: ['', '', '', ''], correctIndex: 0 });
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        if (currentQuestion.question.trim() === '' || currentQuestion.choices.some(choice => choice.trim() === '')) {
            alert('Please fill in all fields before adding a question.');
            return;
        }
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({ question: '', choices: ['', '', '', ''], correctIndex: 0 });
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
        navigate('/quiz', { state: { questions, quizTitle } });
    };

    const handleCancel = () => {
        setQuestions([]);
        setQuizTitle('');
    };

    return (
        <BaseLayout>
            <div className="question-editor">
                <h2 className='text-center quiz-title'>{quizTitle}</h2>
                <h3>Build Your Own Quiz:</h3>
                <input
                    type="text"
                    placeholder="Quiz Title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="form-control mb-3"
                />
                <div className="question-form">
                    <input
                        type="text"
                        placeholder="Question"
                        value={currentQuestion.question}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                        className="form-control mb-2"
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
                    <button onClick={handleAddQuestion} className="btn btn-primary mb-3 me-2">Add Question</button>
                </div>
                <div className="questions-list">
                    {questions.map((q, index) => (
                        <div key={index} className="question-item">
                            <h5>{q.question}</h5>
                            <button onClick={() => handleEditQuestion(index)} className="btn btn-warning">Edit</button>
                            <button onClick={() => handleDeleteQuestion(index)} className="btn btn-danger">Delete</button>
                        </div>
                    ))}
                </div>
                <button onClick={handleStartQuiz} className="btn btn-success">Start Quiz</button>
                <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
            </div>
        </BaseLayout>
    );
};

export default QuestionEditor;