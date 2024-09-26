import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Button.css';

const Button = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const buttonRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsFlipped(false);
        }
    };

    const handleLearnMoreClick = () => {
        // Navigate to the desired route
        navigate('/register'); // Replace '/learn-more' with your route
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            style={{ zIndex: 3 }}
            className={`btn-flip ${isFlipped ? 'flipped' : ''}`}
            onClick={handleClick}
        >
            <div className="inner">
                <div className="front">Click Here</div>
                <div className="back" onClick={handleLearnMoreClick}>Learn More ?</div>
            </div>
        </button>
    );
}

export default Button;
