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

        if (dark) {
            document.body.style.background = '#0a0a1a';
            document.body.style.color = '#e2e8f0';
        } else {
            document.body.style.background = '#fefcf3';
            document.body.style.color = '#1a1a2e';
        }
    }, []);

    useEffect(() => {
        applyTheme(isDark);
    }, []);

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
        }, 10000);

        progressRef.current = setInterval(() => {
            setProgress(prev => Math.min(prev + 1, 100));
        }, 100);

        return () => {
            clearInterval(timerRef.current);
            clearInterval(progressRef.current);
        };
    }, [autoFlip, applyTheme]);

    // Single click = toggle theme + go manual PERMANENTLY
    const handleManualToggle = () => {
        setAutoFlip(false);
        setProgress(0);
        setIsDark(prev => {
            const next = !prev;
            applyTheme(next);
            return next;
        });
        // NO setTimeout to re-enable auto — manual stays manual
    };

    // Double-click = re-enable auto mode (hidden feature for discoverability)
    const handleDoubleClick = () => {
        setAutoFlip(true);
        setProgress(0);
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
            <button
                onClick={handleManualToggle}
                onDoubleClick={handleDoubleClick}
                style={{
                    position: 'relative',
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    border: `2px solid ${isDark ? '#a78bfa' : '#7c3aed'}`,
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(10,10,26,0.9), rgba(26,26,62,0.9))'
                        : 'linear-gradient(135deg, rgba(254,252,243,0.95), rgba(245,240,255,0.95))',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    boxShadow: isDark
                        ? '0 0 16px rgba(167,139,250,0.4), 0 0 32px rgba(232,121,249,0.15)'
                        : '0 0 16px rgba(124,58,237,0.3), 0 0 32px rgba(124,58,237,0.1)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <span style={{
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
                    display: 'inline-block',
                }}>
                    {isDark ? '🌙' : '☀️'}
                </span>

                {autoFlip && (
                    <svg
                        style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            transform: 'rotate(-90deg)',
                        }}
                        viewBox="0 0 52 52"
                    >
                        <circle
                            cx="26" cy="26" r={ringRadius}
                            fill="none"
                            stroke={isDark ? 'rgba(167,139,250,0.2)' : 'rgba(124,58,237,0.2)'}
                            strokeWidth="2"
                        />
                        <circle
                            cx="26" cy="26" r={ringRadius}
                            fill="none"
                            stroke={isDark ? '#a78bfa' : '#7c3aed'}
                            strokeWidth="2"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                        />
                    </svg>
                )}
            </button>

            <span style={{
                fontSize: '8px',
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: autoFlip
                    ? (isDark ? 'rgba(167,139,250,0.6)' : 'rgba(124,58,237,0.6)')
                    : (isDark ? 'rgba(200,200,200,0.4)' : 'rgba(80,80,80,0.5)'),
                animation: autoFlip ? 'pulse-label 2s infinite' : 'none',
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
