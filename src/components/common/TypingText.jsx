import { useState, useEffect } from 'react';

const TypingText = ({
    texts = "",
    typingSpeed = 100,
    clearingSpeed = 60,
    pauseTime = 2000,
    loop = true,
    onComplete = null,
    enabled = true,
    hideCursorOnComplete = false
}) => {
    const [arrayIndex, setArrayIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [charIndex, setCharIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const textArray = Array.isArray(texts)
        ? texts.filter(t => typeof t === 'string')
        : [String(texts)];

    const currentText = textArray[arrayIndex] || "";

    useEffect(() => {
        if (!enabled || isFinished) return;

        let timeout;

        if (isTyping) {
            if (charIndex < currentText.length) {
                timeout = setTimeout(() => {
                    setDisplayText((prev) => prev + currentText[charIndex]);
                    setCharIndex((prev) => prev + 1);
                }, typingSpeed);
            } else {
                if (textArray.length === 1 && !loop) {
                    setIsFinished(true);
                    if (onComplete) onComplete();
                    return;
                }
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, pauseTime);
            }
        } else {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setDisplayText((prev) => prev.slice(0, -1));
                    setCharIndex((prev) => prev - 1);
                }, clearingSpeed);
            } else {
                timeout = setTimeout(() => {
                    setArrayIndex((prev) => (prev + 1) % textArray.length);
                    setIsTyping(true);
                }, 500);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isTyping, arrayIndex, textArray, typingSpeed, clearingSpeed, pauseTime, loop, currentText, enabled, isFinished, onComplete]);

    const showCursor = !isFinished || !hideCursorOnComplete;

    return (
        <span className={`inline-block ${showCursor ? 'border-r-2 border-neon-pink/80' : ''} pr-1 transition-all duration-75`}>
            {displayText}
        </span>
    );
};

export default TypingText;
