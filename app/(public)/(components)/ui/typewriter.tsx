'use client';

import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Typewriter = ({ text, delay, infinite, backspace }: any) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        // eslint-disable-next-line react/prop-types
        if (currentIndex <= text.length) {
            timeout = setTimeout(() => {
                setCurrentText((prevText) => prevText + text[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, delay);
        } else if (infinite) {
            setCurrentIndex(0);
            setCurrentText('');
            // eslint-disable-next-line react/prop-types
        } else if (currentIndex == text.length) {
            timeout = setTimeout(() => {
                setCurrentText((prevText) => prevText.slice(0, -1));
                setCurrentIndex((prevIndex) => prevIndex - 1);
            }, delay);
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, delay, infinite, text, backspace]);

    return <span>⭐{currentText}</span>;
};

export default Typewriter;
