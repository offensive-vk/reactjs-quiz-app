import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavLinks.css';

const NavLinks = () => {
    return (
        <nav className="nav-links">
            <ul className="nav-list" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contribute" className="nav-link">Contribute</Link>
                </li>
                <li className="nav-item">
                    <Link to="/faq" className="nav-link">FAQ</Link>
                </li>
                <li className="nav-item">
                    <Link to="/help" className="nav-link">Help</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavLinks;