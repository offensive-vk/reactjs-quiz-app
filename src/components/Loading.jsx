import React from 'react';
import BaseLayout from './BaseLayout';
import '../styles/Loader.css'

export default function Loading() {
    return (
        <BaseLayout>
            <div className="loading-wrapper">
                <div className="funny-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="loading-text">Internet is supposed to be fast, eh? ... </div>
            </div>
        </BaseLayout>
    );
}
