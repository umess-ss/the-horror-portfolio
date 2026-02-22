import { useEffect, useRef } from 'react';

const COLORS = {
    longitudinal: ['#e879f9', '#a78bfa', '#c084fc', '#d946ef'],
    air: ['#22d3ee', '#67e8f9', '#06b6d4', '#0891b2'],
    frequency: ['#fbbf24', '#f59e0b', '#fb923c', '#f97316'],
    liquidity: ['#34d399', '#6ee7b7', '#10b981', '#2dd4bf'],
};

const WaveEffects = () => {
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

        let time = 0;
        let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animId;

        const animate = () => {
            time += 0.008;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const w = canvas.width;
            const h = canvas.height;

            // ═══ LONGITUDINAL WAVE (horizontal compression waves) ═══
            ctx.save();
            ctx.globalAlpha = 0.12;
            for (let wave = 0; wave < 2; wave++) {
                const yBase = h * 0.2 + wave * h * 0.15;
                const color = COLORS.longitudinal[wave];
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 8;
                ctx.shadowColor = color;
                ctx.beginPath();

                for (let x = 0; x < w; x += 2) {
                    // Compression-rarefaction pattern
                    const compression = Math.sin(x * 0.015 - time * 3 + wave) *
                        Math.sin(x * 0.003 + time * 0.5);
                    const displacement = compression * 18 +
                        Math.sin(x * 0.008 + time * 2) * 6;
                    const y = yBase + displacement;

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();

                // Compression dots (particles bunching together)
                for (let x = 0; x < w; x += 20) {
                    const compression = Math.sin(x * 0.015 - time * 3 + wave);
                    const spacing = 10 + compression * 8;
                    if (spacing < 6) {
                        const y = yBase + Math.sin(x * 0.015 - time * 3 + wave) * 18;
                        ctx.fillStyle = color;
                        ctx.globalAlpha = 0.2 + Math.abs(compression) * 0.15;
                        ctx.beginPath();
                        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
            ctx.restore();

            // ═══ AIR WAVE (turbulent flowing displacements) ═══
            ctx.save();
            ctx.globalAlpha = 0.1;
            for (let layer = 0; layer < 3; layer++) {
                const yBase = h * 0.4 + layer * 12;
                const color = COLORS.air[layer];
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.shadowBlur = 6;
                ctx.shadowColor = color;
                ctx.beginPath();

                for (let x = 0; x < w; x += 2) {
                    // Air turbulence: multiple frequency layers
                    const turbulence =
                        Math.sin(x * 0.006 - time * 1.5 + layer * 0.8) * 25 +
                        Math.sin(x * 0.015 + time * 2.5) * 8 +
                        Math.sin(x * 0.003 - time * 0.7) * 15 +
                        Math.cos(x * 0.01 + time * 1.8 + layer) * 10;

                    // Mouse proximity influence
                    const dx = x - mouse.x;
                    const dy = yBase - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const mouseInfluence = Math.max(0, 1 - dist / 200) * 15;
                    const y = yBase + turbulence + Math.sin(time * 3 + x * 0.01) * mouseInfluence;

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            ctx.restore();

            // ═══ FREQUENCY WAVE (oscilloscope-style sharp peaks) ═══
            ctx.save();
            ctx.globalAlpha = 0.14;
            for (let ch = 0; ch < 2; ch++) {
                const yBase = h * 0.6 + ch * 25;
                const color = COLORS.frequency[ch];
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.2;
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
                ctx.beginPath();

                for (let x = 0; x < w; x += 1) {
                    // Sharp frequency peaks like audio visualization
                    const freq1 = Math.sin(x * 0.02 - time * 4) * 20;
                    const freq2 = Math.sin(x * 0.05 + time * 6) * 8;
                    const freq3 = Math.sin(x * 0.1 - time * 8 + ch * Math.PI) * 4;
                    const envelope = Math.sin(x * 0.003 + time * 0.5) * 0.5 + 0.5;
                    const spike = Math.random() > 0.995 ? (Math.random() - 0.5) * 40 : 0;
                    const y = yBase + (freq1 + freq2 + freq3 + spike) * envelope;

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            ctx.restore();

            // ═══ LIQUIDITY WAVE (smooth flowing organic motion) ═══
            ctx.save();
            ctx.globalAlpha = 0.11;
            for (let layer = 0; layer < 3; layer++) {
                const yBase = h * 0.8 + layer * 15;
                const color = COLORS.liquidity[layer];

                // Filled wave with gradient
                ctx.fillStyle = color + '15';
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.shadowBlur = 6;
                ctx.shadowColor = color;

                ctx.beginPath();
                ctx.moveTo(0, h);

                for (let x = 0; x <= w; x += 2) {
                    // Smooth organic liquid motion
                    const liquid =
                        Math.sin(x * 0.004 - time * 1.2 + layer * 1.2) * 30 +
                        Math.sin(x * 0.008 + time * 0.8 + layer * 0.5) * 15 +
                        Math.sin(x * 0.002 - time * 0.4) * 20 +
                        Math.sin(x * 0.012 + time * 2 + layer * 2) * 8;

                    // Viscosity effect (smoothed mouse response)
                    const dx = x - mouse.x;
                    const dist = Math.abs(dx);
                    const mouseEffect = Math.max(0, 1 - dist / 300) * Math.sin(time * 2) * 20;

                    const y = yBase + liquid + mouseEffect;

                    ctx.lineTo(x, y);
                }

                ctx.lineTo(w, h);
                ctx.closePath();
                ctx.fill();

                // Top stroke
                ctx.beginPath();
                for (let x = 0; x <= w; x += 2) {
                    const liquid =
                        Math.sin(x * 0.004 - time * 1.2 + layer * 1.2) * 30 +
                        Math.sin(x * 0.008 + time * 0.8 + layer * 0.5) * 15 +
                        Math.sin(x * 0.002 - time * 0.4) * 20 +
                        Math.sin(x * 0.012 + time * 2 + layer * 2) * 8;
                    const dx = x - mouse.x;
                    const dist = Math.abs(dx);
                    const mouseEffect = Math.max(0, 1 - dist / 300) * Math.sin(time * 2) * 20;
                    const y = yBase + liquid + mouseEffect;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            ctx.restore();

            animId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
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
                opacity: 0.6,
            }}
        />
    );
};

export default WaveEffects;
