import React from 'react';

const BaseLayout = ({ children }) => {
    return (
        <section className="base-layout">
            <div className="animated-bg"></div>
            <div className="content-wrapper">
                {children}
            </div>
        </section>
    );
};

export default BaseLayout; 