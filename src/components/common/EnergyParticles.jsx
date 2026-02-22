import { useEffect, useRef } from 'react';

const EnergyParticles = () => {
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

        // Multi-color aurora particles
        const colors = [
            '#e879f9', '#a78bfa', '#22d3ee', '#34d399', '#fbbf24',
            '#f472b6', '#818cf8', '#67e8f9', '#6ee7b7', '#fb923c',
            '#c084fc', '#2dd4bf',
        ];
        const particles = [];
        const count = window.innerWidth < 768 ? 20 : 35;

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -(Math.random() * 0.4 + 0.08),
                size: Math.random() * 2.5 + 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random() * 0.4 + 0.08,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
                flicker: Math.random() > 0.7,
                // Color shifting
                colorIndex: Math.floor(Math.random() * colors.length),
                colorTimer: Math.random() * 100,
                colorSpeed: 0.005 + Math.random() * 0.01,
            });
        }

        let animId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.pulse += p.pulseSpeed;
                p.colorTimer += p.colorSpeed;

                // Slowly shift colors
                if (p.colorTimer > 1) {
                    p.colorTimer = 0;
                    p.colorIndex = (p.colorIndex + 1) % colors.length;
                    p.color = colors[p.colorIndex];
                }

                let currentAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
                if (p.flicker) {
                    currentAlpha *= Math.random() > 0.1 ? 1 : 0.2;
                }
                const currentSize = p.size * (0.7 + 0.3 * Math.sin(p.pulse));

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;

                // Glow
                ctx.save();
                ctx.globalAlpha = currentAlpha * 0.2;
                ctx.shadowBlur = 15;
                ctx.shadowColor = p.color;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize * 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // Core
                ctx.save();
                ctx.globalAlpha = currentAlpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            animId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 2,
                opacity: 0.45,
            }}
        />
    );
};

export default EnergyParticles;
