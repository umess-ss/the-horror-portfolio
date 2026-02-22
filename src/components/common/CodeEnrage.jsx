import { useEffect, useRef, useState } from 'react';

const CODE_SNIPPETS = [
    'const AI = new Intelligence();',
    'function deploy() { 🚀 }',
    'git push origin main',
    'npm run build ✓',
    'while(true) { innovate(); }',
    'async function hack() {}',
    '// TODO: Change the world',
    'const future = await Promise.all();',
    'export default Brilliance;',
    'import { magic } from "universe";',
    'sudo make me a sandwich',
    'console.log("Hello World!");',
    'docker compose up -d',
    'python -m venv genius',
    'flutter build legend',
    '{ "status": "awesome" }',
    '<Component isEpic={true} />',
    'SELECT * FROM dreams;',
    'let skills = Infinity;',
    'throw new Error("Too awesome");',
    'return { success: true };',
    'class Developer extends Hero {}',
    'yield* allThePower();',
    'Object.freeze(perfection);',
    '// 🔥 No bugs detected',
    'await brain.supercharge();',
    'useEffect(() => { win(); }, []);',
    'curl -X POST /api/genius',
    'chmod +x dominate.sh',
    'pipe(dream, build, ship)',
];

const COLORS = [
    '#e879f9', '#a78bfa', '#22d3ee', '#34d399', '#fbbf24',
    '#f472b6', '#818cf8', '#67e8f9', '#6ee7b7', '#fb923c',
    '#c084fc', '#2dd4bf', '#f43f5e', '#84cc16',
];

const CodeEnrage = () => {
    const [popups, setPopups] = useState([]);
    const timerRef = useRef(null);

    useEffect(() => {
        const spawnPopup = () => {
            const id = Date.now() + Math.random();
            const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];
            const x = 5 + Math.random() * 85; // % from left
            const y = 10 + Math.random() * 75; // % from top
            const rotation = (Math.random() - 0.5) * 20;
            const scale = 0.7 + Math.random() * 0.5;

            // Animation type
            const animType = Math.floor(Math.random() * 5);
            // 0: pop up from bottom, 1: slide from left, 2: slam in, 3: glitch in, 4: typewriter

            setPopups(prev => [...prev, {
                id, snippet, color, x, y, rotation, scale, animType,
                born: Date.now(),
            }]);

            // Remove after animation
            setTimeout(() => {
                setPopups(prev => prev.filter(p => p.id !== id));
            }, 3500);
        };

        // Spawn at random intervals
        const scheduleNext = () => {
            const delay = 2000 + Math.random() * 4000;
            timerRef.current = setTimeout(() => {
                spawnPopup();
                scheduleNext();
            }, delay);
        };
        scheduleNext();

        // Initial burst of 2
        setTimeout(() => spawnPopup(), 1000);
        setTimeout(() => spawnPopup(), 2500);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const getAnimClass = (type) => {
        switch (type) {
            case 0: return 'code-popup-rise';
            case 1: return 'code-popup-slide';
            case 2: return 'code-popup-slam';
            case 3: return 'code-popup-glitch';
            case 4: return 'code-popup-type';
            default: return 'code-popup-rise';
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
            {popups.map(p => (
                <div
                    key={p.id}
                    className={getAnimClass(p.animType)}
                    style={{
                        position: 'absolute',
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
                        fontFamily: '"Fira Code", "JetBrains Mono", "Orbitron", monospace',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: p.color,
                        textShadow: `0 0 10px ${p.color}55, 0 0 20px ${p.color}22`,
                        padding: '6px 12px',
                        background: `linear-gradient(135deg, ${p.color}08, ${p.color}04)`,
                        border: `1px solid ${p.color}25`,
                        borderRadius: '6px',
                        backdropFilter: 'blur(4px)',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.5px',
                    }}
                >
                    {p.snippet}
                </div>
            ))}
        </div>
    );
};

export default CodeEnrage;
