import React from 'react';
import BaseLayout from './BaseLayout';
import '../styles/Faq.css'
import NavLinks from "./Navlinks";

function FAQ () {
    const faqs = [
        {
            question: "What is this Quiz App?",
            answer: "This Quiz App allows users to take quizzes on various topics, track their scores, and review their performance."
        },
        {
            question: "How do I start a quiz?",
            answer: "To start a quiz, navigate to the home page, select a quiz type, and click on the 'Start Quiz' button."
        },
        {
            question: "Can I create my own quizzes?",
            answer: "Yes! You can upload a JSON file containing your quiz questions to create custom quizzes."
        },
        {
            question: "What happens if I encounter an error?",
            answer: "If you encounter an error, you can click the 'Try Again' button or contact support for assistance."
        },
        {
            question: "How are scores calculated?",
            answer: "Scores are calculated based on the number of correct answers. Each question is worth 5 points."
        },
        {
            question: "Where can I find the results of my quizzes?",
            answer: "After completing a quiz, you will be redirected to the results page where you can view your score and performance."
        },
        {
            question: "Is there a time limit for quizzes?",
            answer: "Currently, there is no time limit for quizzes, allowing you to complete them at your own pace."
        },
    ];

    return (
        <BaseLayout>
            <div className="faq-container">
                <NavLinks />
                <h1 className="text-center hero-text">Frequently Asked Questions</h1>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h4>{faq.question}</h4>
                            <p>{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </BaseLayout>
    );
};

export default FAQ;