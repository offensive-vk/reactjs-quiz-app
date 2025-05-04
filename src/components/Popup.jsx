import React, { useEffect, useState } from 'react';
import '../styles/Popup.css';

const Popup = ({ message, timeout, onClose }) => {
    const [visible, setVisible] = useState(true);
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHiding(true);
            setTimeout(() => {
                setVisible(false);
                if (onClose) {
                    onClose();
                }
            }, 2000);
        }, timeout);

        return () => clearTimeout(timer);
    }, [timeout, onClose]);

    if (!visible) return null;

    return (
        <>
            <div className="overlay" />
            <div className={`popup ${hiding ? 'hide' : ''}`}>
                <div className="popup-content">
                    <p>{message}</p>
                    <button onClick={() => {
                        setHiding(true);
                        setTimeout(() => {
                            setVisible(false);
                            if (onClose) {
                                onClose();
                            }
                        }, 2000);
                    }}>
                        Understood
                    </button>
                </div>
            </div>
        </>
    );
};

export default Popup;
