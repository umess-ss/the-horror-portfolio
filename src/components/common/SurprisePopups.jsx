import { useState, useEffect, useCallback, useRef } from 'react';

const EMOJIS = ['🚀', '⚡', '🔥', '✨', '💎', '🎯', '🧠', '💡', '🎨', '🌟', '⭐', '🎮', '🏆', '💪', '🌈'];
const MESSAGES = [
    '★ You found a secret! ★',
    '⚡ POWER LEVEL: ∞ ⚡',
    '🚀 Deploy initiated...',
    '💎 Achievement unlocked!',
    '🔥 Code is fire!',
    '✨ Magic everywhere!',
    '🧠 Big brain energy!',
    '🎯 Bullseye!',
    '💡 Idea spark!',
    '🎮 +1000 XP',
    '🏆 Legendary code!',
    '💪 Flexing skills!',
    '🌈 Rainbow mode!',
    '⭐ Superstar dev!',
    '🎨 Art of code!',
];

const COLORS = [
    '#e879f9', '#a78bfa', '#22d3ee', '#34d399', '#fbbf24',
    '#f472b6', '#818cf8', '#67e8f9', '#6ee7b7', '#fb923c',
];

const SurprisePopups = () => {
    const [popups, setPopups] = useState([]);
    const [emojiTrail, setEmojiTrail] = useState([]);
    const clickCountRef = useRef(0);
    const comboTimerRef = useRef(null);

    // Combo tracker
    const handleClick = useCallback((e) => {
        // Skip interactive elements
        const tag = e.target.tagName.toLowerCase();
        if (['a', 'button', 'input', 'textarea', 'select'].includes(tag)) return;
        if (e.target.closest('a, button, [role="button"]')) return;

        clickCountRef.current++;
        const count = clickCountRef.current;

        // Clear combo timer
        if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
        comboTimerRef.current = setTimeout(() => {
            clickCountRef.current = 0;
        }, 1500);

        // Rapid click combo — show popup
        if (count >= 5) {
            clickCountRef.current = 0;
            const id = Date.now();
            const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];
            setPopups(prev => [...prev, {
                id, msg, color,
                x: e.clientX, y: e.clientY,
            }]);
            setTimeout(() => setPopups(prev => prev.filter(p => p.id !== id)), 2500);
        }

        // Emoji Trail on every click
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const trailId = Date.now() + Math.random();
        setEmojiTrail(prev => [...prev.slice(-8), {
            id: trailId, emoji,
            x: e.clientX + (Math.random() - 0.5) * 30,
            y: e.clientY,
        }]);
        setTimeout(() => setEmojiTrail(prev => prev.filter(t => t.id !== trailId)), 1200);
    }, []);

    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [handleClick]);

    // Random surprise popups
    useEffect(() => {
        const scheduleSurprise = () => {
            const delay = 15000 + Math.random() * 25000; // Every 15-40s
            return setTimeout(() => {
                const id = Date.now();
                const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
                const color = COLORS[Math.floor(Math.random() * COLORS.length)];
                const x = 100 + Math.random() * (window.innerWidth - 400);
                const y = 100 + Math.random() * (window.innerHeight - 200);
                setPopups(prev => [...prev, { id, msg, color, x, y, auto: true }]);
                setTimeout(() => setPopups(prev => prev.filter(p => p.id !== id)), 3000);
                timer = scheduleSurprise();
            }, delay);
        };
        let timer = scheduleSurprise();
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}>
            {/* Popup messages */}
            {popups.map(p => (
                <div
                    key={p.id}
                    className={p.auto ? 'surprise-popup-auto' : 'surprise-popup-click'}
                    style={{
                        position: 'fixed',
                        left: `${p.x}px`,
                        top: `${p.y}px`,
                        transform: 'translate(-50%, -50%)',
                        fontFamily: '"Orbitron", sans-serif',
                        fontSize: p.auto ? '14px' : '16px',
                        fontWeight: 700,
                        color: p.color,
                        textShadow: `0 0 15px ${p.color}66`,
                        padding: '10px 20px',
                        background: `linear-gradient(135deg, ${p.color}12, ${p.color}08)`,
                        border: `1.5px solid ${p.color}44`,
                        borderRadius: '10px',
                        backdropFilter: 'blur(8px)',
                        whiteSpace: 'nowrap',
                        letterSpacing: '1.5px',
                        pointerEvents: 'none',
                    }}
                >
                    {p.msg}
                </div>
            ))}

            {/* Emoji trail */}
            {emojiTrail.map(t => (
                <div
                    key={t.id}
                    className="emoji-float-up"
                    style={{
                        position: 'fixed',
                        left: `${t.x}px`,
                        top: `${t.y}px`,
                        fontSize: '24px',
                        pointerEvents: 'none',
                    }}
                >
                    {t.emoji}
                </div>
            ))}
        </div>
    );
};

export default SurprisePopups;
