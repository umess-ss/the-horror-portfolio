import { useState, useEffect, useCallback, useRef } from 'react';

const AutoThemeFlip = () => {
    const [isDark, setIsDark] = useState(true);
    const [autoFlip, setAutoFlip] = useState(true);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(null);
    const progressRef = useRef(null);

    const applyTheme = useCallback((dark) => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(dark ? 'dark' : 'light');

        // Actually change CSS variables for real theme switching
        if (dark) {
            document.body.style.background = '#0a0000';
            document.body.style.color = '#e8d0d0';
        } else {
            document.body.style.background = '#f5ebe0';
            document.body.style.color = '#1a0a0a';
        }
    }, []);

    // Apply initial theme
    useEffect(() => {
        applyTheme(isDark);
    }, []);

    // Auto-flip every 5 seconds
    useEffect(() => {
        if (!autoFlip) {
            if (timerRef.current) clearInterval(timerRef.current);
            if (progressRef.current) clearInterval(progressRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setIsDark(prev => {
                const next = !prev;
                applyTheme(next);
                return next;
            });
            setProgress(0);
        }, 5000);

        progressRef.current = setInterval(() => {
            setProgress(prev => Math.min(prev + 2, 100));
        }, 100);

        return () => {
            clearInterval(timerRef.current);
            clearInterval(progressRef.current);
        };
    }, [autoFlip, applyTheme]);

    const handleManualToggle = () => {
        setAutoFlip(false);
        setProgress(0);
        setIsDark(prev => {
            const next = !prev;
            applyTheme(next);
            return next;
        });
        // Re-enable auto after 15s
        setTimeout(() => setAutoFlip(true), 15000);
    };

    const ringRadius = 22;
    const circumference = 2 * Math.PI * ringRadius;
    const offset = circumference * (1 - progress / 100);

    return (
        <div style={{
            position: 'fixed',
            top: '80px',
            right: '16px',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
        }}>
            {/* Toggle button */}
            <button
                onClick={handleManualToggle}
                style={{
                    position: 'relative',
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    border: `2px solid ${isDark ? '#cc1100' : '#ff8800'}`,
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(10,0,0,0.9), rgba(40,5,5,0.9))'
                        : 'linear-gradient(135deg, rgba(255,240,220,0.95), rgba(255,200,150,0.95))',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    boxShadow: isDark
                        ? '0 0 16px rgba(204,17,0,0.4), 0 0 32px rgba(139,0,0,0.2)'
                        : '0 0 16px rgba(255,136,0,0.4), 0 0 32px rgba(255,136,0,0.2)',
                    transition: 'all 0.4s ease',
                }}
            >
                <span style={{
                    transition: 'transform 0.4s ease, opacity 0.3s ease',
                }}>
                    {isDark ? '🌙' : '☀️'}
                </span>

                {/* Progress ring */}
                {autoFlip && (
                    <svg
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            transform: 'rotate(-90deg)',
                        }}
                        viewBox="0 0 52 52"
                    >
                        <circle
                            cx="26" cy="26" r={ringRadius}
                            fill="none"
                            stroke={isDark ? 'rgba(204,17,0,0.2)' : 'rgba(255,136,0,0.2)'}
                            strokeWidth="2"
                        />
                        <circle
                            cx="26" cy="26" r={ringRadius}
                            fill="none"
                            stroke={isDark ? '#cc1100' : '#ff8800'}
                            strokeWidth="2"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                        />
                    </svg>
                )}
            </button>

            {/* Auto label */}
            <span style={{
                fontSize: '8px',
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: autoFlip
                    ? (isDark ? 'rgba(255,68,68,0.6)' : 'rgba(200,80,0,0.6)')
                    : 'rgba(255,255,255,0.4)',
                animation: 'pulse-label 2s infinite',
            }}>
                {autoFlip ? 'AUTO' : 'MANUAL'}
            </span>

            <style>{`
                @keyframes pulse-label {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default AutoThemeFlip;
