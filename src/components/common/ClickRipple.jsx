import { useEffect } from 'react';

const RAINBOW = [
    '#e879f9', '#a78bfa', '#22d3ee', '#34d399', '#fbbf24',
    '#f472b6', '#818cf8', '#67e8f9', '#6ee7b7', '#fb923c',
    '#c084fc', '#2dd4bf',
];

const ClickRipple = () => {
    useEffect(() => {
        const handleClick = (e) => {
            const cx = e.clientX;
            const cy = e.clientY;

            // --- Outer ring ---
            const ring = document.createElement('div');
            ring.className = 'click-ripple-ring outer';
            ring.style.left = `${cx}px`;
            ring.style.top = `${cy}px`;
            ring.style.width = '60px';
            ring.style.height = '60px';
            ring.style.borderColor = RAINBOW[Math.floor(Math.random() * RAINBOW.length)];
            ring.style.boxShadow = `0 0 20px ${RAINBOW[Math.floor(Math.random() * RAINBOW.length)]}66`;
            document.body.appendChild(ring);
            setTimeout(() => ring.remove(), 800);

            // --- Inner ring ---
            const inner = document.createElement('div');
            inner.className = 'click-ripple-ring inner';
            inner.style.left = `${cx}px`;
            inner.style.top = `${cy}px`;
            inner.style.width = '30px';
            inner.style.height = '30px';
            inner.style.background = `radial-gradient(circle, ${RAINBOW[Math.floor(Math.random() * RAINBOW.length)]}55, transparent)`;
            document.body.appendChild(inner);
            setTimeout(() => inner.remove(), 500);

            // --- Flying particles — 12 in a circle ---
            const count = 12;
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div');
                p.className = 'click-ripple-particle';
                const angle = (Math.PI * 2 * i) / count;
                const dist = 40 + Math.random() * 50;
                const dx = Math.cos(angle) * dist;
                const dy = Math.sin(angle) * dist;
                const color = RAINBOW[i % RAINBOW.length];
                p.style.left = `${cx}px`;
                p.style.top = `${cy}px`;
                p.style.background = color;
                p.style.boxShadow = `0 0 6px ${color}`;
                p.style.width = `${4 + Math.random() * 4}px`;
                p.style.height = p.style.width;
                // Animate via custom property
                p.style.setProperty('--dx', `${dx}px`);
                p.style.setProperty('--dy', `${dy}px`);
                p.style.animation = 'none';
                document.body.appendChild(p);

                // Animate with JS for reliable outward flight
                requestAnimationFrame(() => {
                    p.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
                    p.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
                    p.style.opacity = '0';
                });

                setTimeout(() => p.remove(), 700);
            }
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return null;
};

export default ClickRipple;
