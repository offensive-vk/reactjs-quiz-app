import React from 'react';
import BaseLayout from './BaseLayout';
import NavLinks from "./NavLinks";
import '../styles/Faq.css'

function FAQ () {
    const faqs = [
        {
            question: "What is this Quiz App?",
            answer: "This Quiz App (v2025.3.0) is a modern React-based application that allows users to take quizzes on various topics, track their scores, and review their performance. It features a responsive design and smooth user experience."
        },
        {
            question: "How do I start a quiz?",
            answer: "To start a quiz, navigate to the home page, select a quiz type from the available options, and click on the 'Start Quiz' button. The app supports both predefined quizzes and custom quizzes."
        },
        {
            question: "Can I create my own quizzes?",
            answer: "Yes! You can create custom quizzes by uploading a JSON file containing your quiz questions. The app validates the format to ensure compatibility. Each question should have 4 choices, a correct answer index, and you can assign custom marks to each question (default is 10 marks per question)."
        },
        {
            question: "What happens if I encounter an error?",
            answer: "The app includes error boundaries and fallback components to handle errors gracefully. If you encounter an error, you'll see a user-friendly error message with options to try again or return to the home page."
        },
        {
            question: "How are scores calculated?",
            answer: "For standard quizzes, each correct answer is worth 5 points. For custom quizzes, you can assign different marks to each question (default is 10 marks). Skipped questions don't affect your score, but they are tracked separately."
        },
        {
            question: "Where can I find the results of my quizzes?",
            answer: "After completing a quiz, you'll be automatically redirected to the results page. Here you can view your total score, number of correct answers, and skipped questions. Results are displayed with a unique ID for reference."
        },
        {
            question: "Is there a time limit for quizzes?",
            answer: "Currently, there is no time limit for quizzes, allowing you to complete them at your own pace. This feature might be added in future updates based on user feedback."
        },
        {
            question: "What technologies does the app use?",
            answer: "The app is built with React 18, uses Vite for fast development and building, and includes Bootstrap for styling. It also features React Router for navigation and React Error Boundary for error handling."
        },
        {
            question: "How can I report issues or suggest features?",
            answer: "You can report issues or suggest new features by visiting our GitHub repository at github.com/offensive-vk/reactjs-quiz-app. We welcome community contributions and feedback."
        },
        {
            question: "Is my quiz data saved?",
            answer: "Currently, quiz data is not permanently saved. However, the app implements caching for better performance, so your current session's quiz data remains available until you refresh the page."
        }
    ];

    return (
        <BaseLayout>
            <div className="faq-container m-4">
                <NavLinks />
                <h1 className="text-center">Frequently Asked Questions</h1>
                <div className="faq-list m-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h4 className='mt-2'>{faq.question}</h4>
                            <p>{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </BaseLayout>
    );
};

export default FAQ;