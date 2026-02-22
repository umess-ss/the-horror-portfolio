import { useEffect, useRef } from 'react';

const CODE_CHARS = [
    'const', '=>', '{}', '//', 'fn', '()', '&&', '||', '!=', '===',
    'let', 'if', '<>', '</>', '[]', 'import', 'async', 'await', 'return',
    '0x', '++', '--', '/**/', '<?>', 'null', 'true', '::', 'class',
    'export', 'void', 'npm', 'git', '<div>', 'API', '404', 'http',
    'useState', 'useEffect', 'React', 'node', 'def', 'self', 'pip',
];

const CometCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Stars — a lot more
        const stars = Array.from({ length: 200 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.8 + 0.2,
            twinkleSpeed: Math.random() * 0.03 + 0.005,
            twinklePhase: Math.random() * Math.PI * 2,
        }));

        // Comets
        const comets = [];
        const spawnComet = () => {
            const fromLeft = Math.random() > 0.3;
            const angle = fromLeft
                ? -Math.PI / 6 + (Math.random() - 0.5) * 0.4
                : -Math.PI + Math.PI / 6 + (Math.random() - 0.5) * 0.4;
            const speed = 4 + Math.random() * 5;
            comets.push({
                x: fromLeft
                    ? -50 + Math.random() * canvas.width * 0.4
                    : canvas.width + 50 - Math.random() * canvas.width * 0.4,
                y: -50 + Math.random() * canvas.height * 0.3,
                vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
                vy: Math.abs(Math.sin(angle)) * speed * 0.5 + speed * 0.6,
                size: 1.5 + Math.random() * 2.5,
                trail: [],
                life: 0,
                maxLife: 100 + Math.random() * 100,
                hue: [280, 190, 320, 160, 220, 340][Math.floor(Math.random() * 6)],
            });
        };

        // Floating code characters
        const codeChars = Array.from({ length: 35 }, () => ({
            text: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedY: -(Math.random() * 0.4 + 0.08),
            speedX: (Math.random() - 0.5) * 0.15,
            opacity: 0,
            maxOpacity: Math.random() * 0.12 + 0.04,
            fontSize: Math.random() * 10 + 10,
            phase: Math.random() * Math.PI * 2,
            hue: [270, 190, 320, 160][Math.floor(Math.random() * 4)],
        }));

        // Floating particles
        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: -(Math.random() * 0.4 + 0.1),
            opacity: Math.random() * 0.5 + 0.1,
            hue: [280, 190, 320, 160, 50][Math.floor(Math.random() * 5)],
        }));

        let frame = 0;
        let animId;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;

            // Draw stars with twinkle
            stars.forEach(s => {
                const alpha = 0.3 + 0.6 * Math.sin(frame * s.twinkleSpeed + s.twinklePhase);
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 200, 255, ${alpha})`;
                ctx.fill();
            });

            // Draw floating code characters
            ctx.save();
            codeChars.forEach(c => {
                c.y += c.speedY;
                c.x += c.speedX;
                c.opacity = c.maxOpacity * (0.5 + 0.5 * Math.sin(frame * 0.015 + c.phase));

                if (c.y < -30) {
                    c.y = canvas.height + 30;
                    c.x = Math.random() * canvas.width;
                    c.text = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
                }
                if (c.x < -50) c.x = canvas.width + 50;
                if (c.x > canvas.width + 50) c.x = -50;

                ctx.font = `${c.fontSize}px 'Fira Code', 'JetBrains Mono', monospace`;
                ctx.fillStyle = `hsla(${c.hue}, 70%, 70%, ${c.opacity})`;
                ctx.fillText(c.text, c.x, c.y);
            });
            ctx.restore();

            // Draw floating particles
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.opacity = 0.15 + 0.25 * Math.sin(frame * 0.02 + p.x);

                if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
                ctx.fill();
            });

            // Spawn comets more frequently — lots of them!
            if (frame % 60 === 0) spawnComet();
            if (frame % 90 === 0 && Math.random() > 0.3) spawnComet();
            if (frame % 150 === 0) { spawnComet(); spawnComet(); } // burst pair

            // Draw comets
            for (let i = comets.length - 1; i >= 0; i--) {
                const c = comets[i];
                c.x += c.vx;
                c.y += c.vy;
                c.life++;
                c.trail.push({ x: c.x, y: c.y });
                if (c.trail.length > 30) c.trail.shift();

                const lifeRatio = 1 - c.life / c.maxLife;

                // Trail
                for (let j = 0; j < c.trail.length; j++) {
                    const t = c.trail[j];
                    const trailAlpha = (j / c.trail.length) * 0.65 * lifeRatio;
                    const trailSize = c.size * (j / c.trail.length) * 0.7;
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, trailSize, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${c.hue}, 80%, 75%, ${trailAlpha})`;
                    ctx.fill();
                }

                // Head glow
                const gradient = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size * 5);
                gradient.addColorStop(0, `hsla(${c.hue}, 90%, 85%, ${0.9 * lifeRatio})`);
                gradient.addColorStop(0.4, `hsla(${c.hue}, 80%, 65%, ${0.35 * lifeRatio})`);
                gradient.addColorStop(1, `hsla(${c.hue}, 70%, 50%, 0)`);
                ctx.beginPath();
                ctx.arc(c.x, c.y, c.size * 5, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Head core
                ctx.beginPath();
                ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${c.hue}, 90%, 92%, ${lifeRatio})`;
                ctx.fill();

                if (c.life >= c.maxLife || c.x > canvas.width + 100 || c.x < -100 || c.y > canvas.height + 100) {
                    comets.splice(i, 1);
                }
            }

            animId = requestAnimationFrame(draw);
        };

        // Spawn initial comets
        spawnComet();
        spawnComet();
        spawnComet();
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="comet-canvas"
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
        />
    );
};

export default CometCanvas;
