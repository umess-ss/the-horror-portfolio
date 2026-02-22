import { useState, useEffect, useCallback, useRef } from 'react';

// Multi-color rainbow/aurora lightning palette
const LIGHTNING_PALETTES = [
    ['#e879f9', '#d946ef', '#c026d3', '#a855f7'], // Pink-Purple
    ['#22d3ee', '#06b6d4', '#0891b2', '#67e8f9'], // Cyan
    ['#a78bfa', '#8b5cf6', '#7c3aed', '#c4b5fd'], // Violet
    ['#34d399', '#10b981', '#059669', '#6ee7b7'], // Emerald
    ['#fbbf24', '#f59e0b', '#d97706', '#fcd34d'], // Amber
    ['#f472b6', '#ec4899', '#db2777', '#f9a8d4'], // Pink
    ['#818cf8', '#6366f1', '#4f46e5', '#a5b4fc'], // Indigo
    ['#fb923c', '#f97316', '#ea580c', '#fdba74'], // Orange
    ['#2dd4bf', '#14b8a6', '#0d9488', '#5eead4'], // Teal
    ['#e879f9', '#22d3ee', '#34d399', '#fbbf24'], // Rainbow mix
];

const LightningBolt = () => {
    const [bolts, setBolts] = useState([]);
    const svgRef = useRef(null);
    const gradientIdRef = useRef(0);

    const createBolt = useCallback((options = {}) => {
        const id = Date.now() + Math.random();
        const palette = LIGHTNING_PALETTES[Math.floor(Math.random() * LIGHTNING_PALETTES.length)];
        const mainColor = palette[Math.floor(Math.random() * palette.length)];
        const glowColor = palette[0];
        const segments = [];

        // Direction: 0=top-down, 1=left-right, 2=right-left, 3=diagonal
        const direction = options.direction ?? Math.floor(Math.random() * 4);
        let currentX, currentY;

        if (direction === 0) {
            currentX = Math.random() * 100;
            currentY = 0;
        } else if (direction === 1) {
            currentX = 0;
            currentY = 10 + Math.random() * 80;
        } else if (direction === 2) {
            currentX = 100;
            currentY = 10 + Math.random() * 80;
        } else {
            currentX = Math.random() > 0.5 ? 0 : 100;
            currentY = Math.random() * 30;
        }

        const segCount = 8 + Math.floor(Math.random() * 8);

        for (let i = 0; i < segCount; i++) {
            let nextX, nextY;

            if (direction === 0) {
                nextX = currentX + (Math.random() - 0.5) * 16;
                nextY = currentY + 4 + Math.random() * 12;
            } else if (direction === 1) {
                nextX = currentX + 4 + Math.random() * 10;
                nextY = currentY + (Math.random() - 0.5) * 14;
            } else if (direction === 2) {
                nextX = currentX - 4 - Math.random() * 10;
                nextY = currentY + (Math.random() - 0.5) * 14;
            } else {
                nextX = currentX + (currentX < 50 ? 1 : -1) * (3 + Math.random() * 8);
                nextY = currentY + 3 + Math.random() * 8;
            }

            const branchColor = palette[Math.floor(Math.random() * palette.length)];
            segments.push({
                x1: currentX, y1: currentY, x2: nextX, y2: nextY,
                color: mainColor, branchColor
            });

            // Branching — 30% chance with multi-color branches
            if (Math.random() > 0.7 && i > 1) {
                const branchLen = 1 + Math.floor(Math.random() * 4);
                let bx = nextX, by = nextY;
                for (let j = 0; j < branchLen; j++) {
                    const bc = palette[Math.floor(Math.random() * palette.length)];
                    const bnx = bx + (Math.random() - 0.5) * 20;
                    const bny = by + (direction === 0 ? (2 + Math.random() * 5) : (Math.random() - 0.5) * 10);
                    segments.push({
                        x1: bx, y1: by, x2: bnx, y2: bny,
                        branch: true, color: bc, branchColor: bc
                    });
                    bx = bnx;
                    by = bny;
                }
            }

            currentX = nextX;
            currentY = nextY;
        }

        const gradId = `lg-${gradientIdRef.current++}`;
        setBolts(prev => [...prev, { id, segments, mainColor, glowColor, palette, gradId }]);

        // Multi-color flash
        const overlay = document.getElementById('horror-flash');
        if (overlay) {
            overlay.style.background = `radial-gradient(ellipse at 50% 0%, ${mainColor}44 0%, ${glowColor}22 40%, transparent 70%)`;
            overlay.style.opacity = '0.12';
            setTimeout(() => { overlay.style.opacity = '0'; }, 100);
        }

        // Remove bolt
        setTimeout(() => {
            setBolts(prev => prev.filter(b => b.id !== id));
        }, 150 + Math.random() * 100);
    }, []);

    useEffect(() => {
        const interval1 = setInterval(() => {
            if (Math.random() > 0.5) createBolt();
        }, 2200);

        const interval2 = setInterval(() => {
            if (Math.random() > 0.55) createBolt({ direction: 1 });
        }, 3800);

        const interval3 = setInterval(() => {
            if (Math.random() > 0.6) createBolt({ direction: 2 });
        }, 4200);

        // Chain lightning: rapid multi-bolt
        const interval4 = setInterval(() => {
            const dir = Math.floor(Math.random() * 4);
            createBolt({ direction: dir });
            setTimeout(() => createBolt({ direction: dir }), 50);
            setTimeout(() => createBolt({ direction: (dir + 1) % 4 }), 100);
        }, 7000);

        // Diagonal bolts
        const interval5 = setInterval(() => {
            if (Math.random() > 0.65) createBolt({ direction: 3 });
        }, 5000);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
            clearInterval(interval3);
            clearInterval(interval4);
            clearInterval(interval5);
        };
    }, [createBolt]);

    return (
        <>
            {/* Color flash overlay */}
            <div
                id="horror-flash"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    opacity: 0,
                    transition: 'opacity 0.08s ease-out',
                }}
            />

            <svg
                ref={svgRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 3,
                }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <filter id="rainbow-glow">
                        <feGaussianBlur stdDeviation="1.2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="branch-glow">
                        <feGaussianBlur stdDeviation="0.6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {bolts.map(bolt => (
                    <g key={bolt.id}>
                        {bolt.segments.map((seg, i) => (
                            <g key={i}>
                                {/* Outer glow line */}
                                <line
                                    x1={seg.x1}
                                    y1={seg.y1}
                                    x2={seg.x2}
                                    y2={seg.y2}
                                    stroke={seg.color}
                                    strokeWidth={seg.branch ? '0.15' : '0.4'}
                                    opacity={seg.branch ? 0.3 : 0.5}
                                    filter="url(#rainbow-glow)"
                                    strokeLinecap="round"
                                />
                                {/* Core line */}
                                <line
                                    x1={seg.x1}
                                    y1={seg.y1}
                                    x2={seg.x2}
                                    y2={seg.y2}
                                    stroke={seg.branch ? seg.branchColor : '#fff'}
                                    strokeWidth={seg.branch ? '0.05' : '0.12'}
                                    opacity={seg.branch ? 0.6 : 0.95}
                                    filter={seg.branch ? 'url(#branch-glow)' : undefined}
                                    strokeLinecap="round"
                                />
                            </g>
                        ))}
                    </g>
                ))}
            </svg>
        </>
    );
};

export default LightningBolt;
