import { useState, useEffect, useCallback, useRef } from 'react';

const FIRE_COLORS = ['#ff1a1a', '#cc0000', '#ff4400', '#ff6600', '#8b0000', '#ff2200'];

const LightningBolt = () => {
    const [bolts, setBolts] = useState([]);
    const svgRef = useRef(null);

    const createBolt = useCallback(() => {
        const id = Date.now() + Math.random();
        const x = Math.random() * 100;
        const color = FIRE_COLORS[Math.floor(Math.random() * FIRE_COLORS.length)];
        const segments = [];
        let currentX = x;
        let currentY = 0;
        const segCount = 8 + Math.floor(Math.random() * 6);

        for (let i = 0; i < segCount; i++) {
            const nextX = currentX + (Math.random() - 0.5) * 14;
            const nextY = currentY + 4 + Math.random() * 12;
            segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });

            // Fire branching — 25% chance
            if (Math.random() > 0.75 && i > 2) {
                const branchLen = 1 + Math.floor(Math.random() * 3);
                let bx = nextX, by = nextY;
                for (let j = 0; j < branchLen; j++) {
                    const bnx = bx + (Math.random() - 0.5) * 18;
                    const bny = by + 2 + Math.random() * 5;
                    segments.push({ x1: bx, y1: by, x2: bnx, y2: bny, branch: true });
                    bx = bnx;
                    by = bny;
                }
            }

            currentX = nextX;
            currentY = nextY;
        }

        setBolts(prev => [...prev, { id, segments, color }]);

        // Ominous red flash
        const overlay = document.getElementById('horror-flash');
        if (overlay) {
            overlay.style.opacity = '0.15';
            setTimeout(() => { overlay.style.opacity = '0'; }, 80);
        }

        // Remove bolt
        setTimeout(() => {
            setBolts(prev => prev.filter(b => b.id !== id));
        }, 120 + Math.random() * 80);
    }, []);

    useEffect(() => {
        // Slower intervals for less lag
        const interval1 = setInterval(() => {
            if (Math.random() > 0.5) createBolt();
        }, 2500);

        const interval2 = setInterval(() => {
            if (Math.random() > 0.6) createBolt();
        }, 3500);

        // Occasional double strike
        const interval3 = setInterval(() => {
            createBolt();
            setTimeout(() => createBolt(), 60);
        }, 6000);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
            clearInterval(interval3);
        };
    }, [createBolt]);

    return (
        <>
            {/* Red flash overlay */}
            <div
                id="horror-flash"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(255,20,20,0.4) 0%, rgba(139,0,0,0.2) 40%, transparent 70%)',
                    opacity: 0,
                    transition: 'opacity 0.06s ease-out',
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
                    <filter id="fire-glow">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feColorMatrix
                            type="matrix"
                            values="1 0 0 0 0.3
                                    0 0.2 0 0 0
                                    0 0 0.1 0 0
                                    0 0 0 1 0"
                            in="blur"
                            result="colored"
                        />
                        <feMerge>
                            <feMergeNode in="colored" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="fire-glow-branch">
                        <feGaussianBlur stdDeviation="0.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {bolts.map(bolt => (
                    <g key={bolt.id}>
                        {bolt.segments.map((seg, i) => (
                            <line
                                key={i}
                                x1={seg.x1}
                                y1={seg.y1}
                                x2={seg.x2}
                                y2={seg.y2}
                                stroke={bolt.color}
                                strokeWidth={seg.branch ? '0.06' : '0.18'}
                                opacity={seg.branch ? 0.5 : 0.9}
                                filter={seg.branch ? 'url(#fire-glow-branch)' : 'url(#fire-glow)'}
                            />
                        ))}
                    </g>
                ))}
            </svg>
        </>
    );
};

export default LightningBolt;
