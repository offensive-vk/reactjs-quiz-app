import React, { useEffect, useState } from 'react';
import '..styles/Popup.css';

const Popup = ({ message, timeout, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) {
                onClose();
            }
        }, timeout);

        return () => clearTimeout(timer);
    }, [timeout, onClose]);

    if (!visible) return null; // Don't render if not visible

    return (
        <div className="popup">
            <div className="popup-content">
                <p>{message}</p>
                <button onClick={() => {
                    setVisible(false);
                    if (onClose) {
                        onClose();
                    }
                }}>
                    Understood
                </button>
            </div>
        </div>
    );
};

export default Popup;