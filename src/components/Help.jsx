import React from 'react';
import BaseLayout from './BaseLayout';
import '../styles/Help.css'

function Help () {
    const troubleshootingGuidelines = [
        {
            issue: "The app is not loading.",
            solution: "Ensure you have a stable internet connection. Try refreshing the page or clearing your browser cache."
        },
        {
            issue: "I encountered an error while taking a quiz.",
            solution: "If you see an error message, try clicking 'Try Again'. If the issue persists, check the console for errors."
        },
        {
            issue: "My custom quiz is not loading.",
            solution: "Make sure your JSON file is formatted correctly according to the schema. Refer to the documentation for details."
        },
        {
            issue: "I want to contribute to the project.",
            solution: "You can create issues or submit pull requests on our GitHub repository. Please follow the contribution guidelines."
        },
        {
            issue: "For any other complex issues",
            solution: "Feel free to reach out by creating issues on our github repository."
        }
    ];

    return (
        <BaseLayout>
            <div className="help-container">
                <h1 className="text-center">Help & Troubleshooting</h1>
                <div className="troubleshooting-list">
                    {troubleshootingGuidelines.map((item, index) => (
                        <div key={index} className="troubleshooting-item">
                            <h4>Issue: {item.issue}</h4>
                            <p>Solution: {item.solution}</p>
                        </div>
                    ))}
                </div>
                <div className="github-links text-center">
                    <h3 className='contribute'>Contribute to the Project</h3>
                    <p>If you encounter any issues or want to contribute, please do so by visiting:</p><br />
                    <a 
                        className='contribute-btn'
                        href="https://github.com/offensive-vk/reactjs-quiz-app/issues" target="_blank" rel="noopener noreferrer">
                        Report Issues
                    </a>
                    <a 
                        className='contribute-btn'
                        href="https://github.com/offensive-vk/reactjs-quiz-app/pulls" target="_blank" rel="noopener noreferrer">
                        Submit Pull Request
                    </a>
                </div>
            </div>
        </BaseLayout>
    );
};

export default Help;