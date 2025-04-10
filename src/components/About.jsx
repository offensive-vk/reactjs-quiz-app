import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import BaseLayout from "./BaseLayout";
import NavLinks from "./Navlinks";
import '../styles/About.css';

function About () {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch('/assets/about.md')
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, []);

    return (
        <BaseLayout>
            <div className="about-container">
                <NavLinks />
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </BaseLayout>
    );
};

export default About;