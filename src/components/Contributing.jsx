import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import BaseLayout from "./BaseLayout";
import NavLinks from "./NavLinks";
import '../styles/Contributing.css';

function Contributing () {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch('/assets/contributing.md')
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, []);

    return (
        <BaseLayout>
            <div className="contributing-container">
                <NavLinks />
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </BaseLayout>
    );
};

export default Contributing;