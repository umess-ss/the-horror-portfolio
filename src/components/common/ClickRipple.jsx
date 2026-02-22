import { useEffect, useRef } from 'react';

const RAINBOW = [
    '#e879f9', '#a78bfa', '#22d3ee', '#34d399', '#fbbf24',
    '#f472b6', '#818cf8', '#67e8f9', '#6ee7b7', '#fb923c',
    '#c084fc', '#2dd4bf', '#f43f5e', '#84cc16',
];

const randomColor = () => RAINBOW[Math.floor(Math.random() * RAINBOW.length)];
const randomBetween = (a, b) => a + Math.random() * (b - a);

// ═══ EFFECT 1: Classic Ring Burst (improved) ═══
function effectRingBurst(cx, cy) {
    for (let r = 0; r < 3; r++) {
        const ring = document.createElement('div');
        const color = randomColor();
        Object.assign(ring.style, {
            position: 'fixed', left: `${cx}px`, top: `${cy}px`,
            width: `${40 + r * 25}px`, height: `${40 + r * 25}px`,
            border: `2px solid ${color}`, borderRadius: '50%',
            pointerEvents: 'none', zIndex: '9999',
            boxShadow: `0 0 20px ${color}66, inset 0 0 10px ${color}33`,
            transform: 'translate(-50%,-50%) scale(0)', opacity: '1',
            transition: `all ${0.6 + r * 0.15}s cubic-bezier(0.22,1,0.36,1)`,
        });
        document.body.appendChild(ring);
        requestAnimationFrame(() => {
            ring.style.transform = `translate(-50%,-50%) scale(${3 + r})`;
            ring.style.opacity = '0';
        });
        setTimeout(() => ring.remove(), 900 + r * 150);
    }
    spawnParticles(cx, cy, 14);
}

// ═══ EFFECT 2: Shockwave (concentric pulse rings) ═══
function effectShockwave(cx, cy) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            const color = randomColor();
            Object.assign(wave.style, {
                position: 'fixed', left: `${cx}px`, top: `${cy}px`,
                width: '20px', height: '20px',
                border: `${3 - i * 0.4}px solid ${color}`,
                borderRadius: '50%', pointerEvents: 'none', zIndex: '9999',
                transform: 'translate(-50%,-50%) scale(0)', opacity: '0.9',
                transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
                boxShadow: `0 0 30px ${color}44`,
            });
            document.body.appendChild(wave);
            requestAnimationFrame(() => {
                wave.style.transform = `translate(-50%,-50%) scale(${6 + i * 2})`;
                wave.style.opacity = '0';
            });
            setTimeout(() => wave.remove(), 1000);
        }, i * 80);
    }
}

// ═══ EFFECT 3: DNA Helix Spiral ═══
function effectDNAHelix(cx, cy) {
    const count = 20;
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        const t = (i / count) * Math.PI * 4;
        const radius = 60 + i * 4;
        const dx = Math.cos(t) * radius;
        const dy = -i * 12;
        const color = RAINBOW[i % RAINBOW.length];
        Object.assign(dot.style, {
            position: 'fixed', left: `${cx}px`, top: `${cy}px`,
            width: `${6 + Math.sin(t) * 3}px`, height: `${6 + Math.sin(t) * 3}px`,
            background: color, borderRadius: '50%',
            pointerEvents: 'none', zIndex: '9999',
            boxShadow: `0 0 8px ${color}`,
            transform: 'translate(-50%,-50%) scale(0)', opacity: '1',
            transition: `all ${0.4 + i * 0.03}s cubic-bezier(0.22,1,0.36,1)`,
        });
        document.body.appendChild(dot);
        setTimeout(() => {
            dot.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`;
            dot.style.opacity = '0';
        }, i * 20);
        setTimeout(() => dot.remove(), 800 + i * 30);
    }
    // Mirror strand
    for (let i = 0; i < count; i++) {
        const dot2 = document.createElement('div');
        const t = (i / count) * Math.PI * 4 + Math.PI;
        const radius = 60 + i * 4;
        const dx = Math.cos(t) * radius;
        const dy = -i * 12;
        const color = RAINBOW[(i + 5) % RAINBOW.length];
        Object.assign(dot2.style, {
            position: 'fixed', left: `${cx}px`, top: `${cy}px`,
            width: `${5 + Math.cos(t) * 2}px`, height: `${5 + Math.cos(t) * 2}px`,
            background: color, borderRadius: '50%',
            pointerEvents: 'none', zIndex: '9999',
            boxShadow: `0 0 6px ${color}`,
            transform: 'translate(-50%,-50%) scale(0)', opacity: '0.8',
            transition: `all ${0.4 + i * 0.03}s cubic-bezier(0.22,1,0.36,1)`,
        });
        document.body.appendChild(dot2);
        setTimeout(() => {
            dot2.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`;
            dot2.style.opacity = '0';
        }, i * 20);
        setTimeout(() => dot2.remove(), 800 + i * 30);
    }
}

// ═══ EFFECT 4: Vortex Spiral ═══
function effectVortex(cx, cy) {
    const count = 24;
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        const angle = (i / count) * Math.PI * 6;
        const dist = 20 + i * 6;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const color = RAINBOW[i % RAINBOW.length];
        const size = 8 - (i / count) * 5;
        Object.assign(dot.style, {
            position: 'fixed', left: `${cx}px`, top: `${cy}px`,
            width: `${size}px`, height: `${size}px`,
            background: color, borderRadius: '50%',
            pointerEvents: 'none', zIndex: '9999',
            boxShadow: `0 0 12px ${color}`,
            transform: 'translate(-50%,-50%)', opacity: '0',
            transition: `all ${0.5 + i * 0.02}s cubic-bezier(0.34,1.56,0.64,1)`,
        });
        document.body.appendChild(dot);
        setTimeout(() => {
            dot.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${angle * 30}deg)`;
            dot.style.opacity = '1';
        }, i * 15);
        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform += ' scale(0)';
        }, 500 + i * 15);
        setTimeout(() => dot.remove(), 1000 + i * 15);
    }
}

// ═══ EFFECT 5: Matrix Code Rain ═══
function effectMatrixRain(cx, cy) {
    const chars = 'アイウエオカキクケコ01サシスセソ{}[];=></>∆∑∏λ';
    const columns = 12;
    for (let c = 0; c < columns; c++) {
        const drops = 4 + Math.floor(Math.random() * 3);
        const offsetX = (c - columns / 2) * 22;
        for (let d = 0; d < drops; d++) {
            const ch = document.createElement('div');
            const char = chars[Math.floor(Math.random() * chars.length)];
            const green = `hsl(${140 + Math.random() * 40}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 30}%)`;
            ch.textContent = char;
            Object.assign(ch.style, {
                position: 'fixed', left: `${cx + offsetX}px`, top: `${cy}px`,
                fontFamily: '"Fira Code", "Orbitron", monospace',
                fontSize: `${12 + Math.random() * 6}px`,
                color: green, pointerEvents: 'none', zIndex: '9999',
                textShadow: `0 0 8px ${green}`,
                transform: `translate(-50%,-50%)`, opacity: '0.9',
                transition: `all ${0.6 + d * 0.1}s linear`,
            });
            document.body.appendChild(ch);
            setTimeout(() => {
                ch.style.transform = `translate(-50%, calc(-50% + ${60 + d * 30}px))`;
                ch.style.opacity = '0';
            }, d * 60 + c * 20);
            setTimeout(() => ch.remove(), 1000 + d * 100);
        }
    }
}

// ═══ EFFECT 6: Plasma Burst ═══
function effectPlasmaBurst(cx, cy) {
    // Central flash
    const flash = document.createElement('div');
    Object.assign(flash.style, {
        position: 'fixed', left: `${cx}px`, top: `${cy}px`,
        width: '10px', height: '10px', borderRadius: '50%',
        background: `radial-gradient(circle, #fff, ${randomColor()}, transparent)`,
        pointerEvents: 'none', zIndex: '9999',
        transform: 'translate(-50%,-50%) scale(1)', opacity: '1',
        transition: 'all 0.4s ease-out',
    });
    document.body.appendChild(flash);
    requestAnimationFrame(() => {
        flash.style.transform = 'translate(-50%,-50%) scale(12)';
        flash.style.opacity = '0';
    });
    setTimeout(() => flash.remove(), 500);

    // Plasma tendrils
    for (let i = 0; i < 8; i++) {
        const tendril = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.5;
        const length = 60 + Math.random() * 80;
        const color = randomColor();
        const thickness = 2 + Math.random() * 3;
        Object.assign(tendril.style, {
            position: 'fixed',
            left: `${cx}px`, top: `${cy}px`,
            width: `${length}px`, height: `${thickness}px`,
            background: `linear-gradient(90deg, ${color}, ${randomColor()}, transparent)`,
            borderRadius: `${thickness}px`,
            pointerEvents: 'none', zIndex: '9999',
            transformOrigin: '0 50%',
            transform: `rotate(${angle}rad) scaleX(0)`,
            opacity: '1', boxShadow: `0 0 10px ${color}`,
            transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        });
        document.body.appendChild(tendril);
        requestAnimationFrame(() => {
            tendril.style.transform = `rotate(${angle}rad) scaleX(1)`;
        });
        setTimeout(() => {
            tendril.style.opacity = '0';
            tendril.style.transform = `rotate(${angle}rad) scaleX(1.5)`;
        }, 300);
        setTimeout(() => tendril.remove(), 700);
    }
}

// ═══ EFFECT 7: Electromagnetic Pulse ═══
function effectEMP(cx, cy) {
    // Hex grid pulse
    for (let ring = 0; ring < 3; ring++) {
        const sides = 6;
        for (let i = 0; i < sides; i++) {
            const hex = document.createElement('div');
            const angle = (Math.PI * 2 * i) / sides + ring * 0.5;
            const dist = 40 + ring * 50;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;
            const color = RAINBOW[(i + ring * 3) % RAINBOW.length];
            const size = 16 - ring * 3;
            Object.assign(hex.style, {
                position: 'fixed', left: `${cx}px`, top: `${cy}px`,
                width: `${size}px`, height: `${size}px`,
                border: `1.5px solid ${color}`,
                pointerEvents: 'none', zIndex: '9999',
                transform: `translate(-50%,-50%) rotate(${30 + i * 60}deg)`,
                opacity: '0', boxShadow: `0 0 8px ${color}55`,
                transition: `all ${0.4 + ring * 0.15}s cubic-bezier(0.34,1.56,0.64,1)`,
            });
            document.body.appendChild(hex);
            setTimeout(() => {
                hex.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${180 + i * 60}deg)`;
                hex.style.opacity = '0.9';
            }, ring * 80);
            setTimeout(() => {
                hex.style.opacity = '0';
                hex.style.transform += ' scale(0.3)';
            }, 400 + ring * 100);
            setTimeout(() => hex.remove(), 800 + ring * 100);
        }
    }

    // Center pulse
    const pulse = document.createElement('div');
    Object.assign(pulse.style, {
        position: 'fixed', left: `${cx}px`, top: `${cy}px`,
        width: '6px', height: '6px', borderRadius: '50%',
        background: '#fff', pointerEvents: 'none', zIndex: '9999',
        transform: 'translate(-50%,-50%) scale(1)', opacity: '1',
        boxShadow: `0 0 30px ${randomColor()}, 0 0 60px ${randomColor()}`,
        transition: 'all 0.3s ease-out',
    });
    document.body.appendChild(pulse);
    requestAnimationFrame(() => {
        pulse.style.transform = 'translate(-50%,-50%) scale(6)';
        pulse.style.opacity = '0';
    });
    setTimeout(() => pulse.remove(), 400);
}

// ═══ EFFECT 8: Fireworks ═══
function effectFireworks(cx, cy) {
    // Rising trail
    const trail = document.createElement('div');
    Object.assign(trail.style, {
        position: 'fixed', left: `${cx}px`, top: `${cy + 50}px`,
        width: '3px', height: '20px', borderRadius: '2px',
        background: `linear-gradient(180deg, ${randomColor()}, transparent)`,
        pointerEvents: 'none', zIndex: '9999',
        transform: 'translateX(-50%)', opacity: '1',
        transition: 'all 0.25s ease-in',
    });
    document.body.appendChild(trail);
    requestAnimationFrame(() => {
        trail.style.top = `${cy - 40}px`;
        trail.style.opacity = '0.3';
    });
    setTimeout(() => trail.remove(), 300);

    // Burst after trail
    setTimeout(() => {
        const layers = 3;
        for (let l = 0; l < layers; l++) {
            const count = 10 + l * 4;
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div');
                const angle = (Math.PI * 2 * i) / count + l * 0.3;
                const dist = (40 + l * 25) + Math.random() * 20;
                const dx = Math.cos(angle) * dist;
                const dy = Math.sin(angle) * dist + Math.random() * 20; // gravity
                const color = RAINBOW[(i + l * 5) % RAINBOW.length];
                const size = 4 - l;
                Object.assign(p.style, {
                    position: 'fixed', left: `${cx}px`, top: `${cy - 40}px`,
                    width: `${size}px`, height: `${size}px`,
                    background: color, borderRadius: '50%',
                    pointerEvents: 'none', zIndex: '9999',
                    boxShadow: `0 0 6px ${color}`,
                    transform: 'translate(-50%,-50%)', opacity: '1',
                    transition: `all ${0.5 + l * 0.15}s cubic-bezier(0.22,1,0.36,1)`,
                });
                document.body.appendChild(p);
                requestAnimationFrame(() => {
                    p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.2)`;
                    p.style.opacity = '0';
                });
                setTimeout(() => p.remove(), 800 + l * 150);
            }
        }
    }, 200);
}

// ═══ EFFECT 9: Portal / Wormhole ═══
function effectPortal(cx, cy) {
    for (let r = 0; r < 4; r++) {
        const ring = document.createElement('div');
        const color = RAINBOW[r * 3 % RAINBOW.length];
        const size = 30 + r * 20;
        Object.assign(ring.style, {
            position: 'fixed', left: `${cx}px`, top: `${cy}px`,
            width: `${size}px`, height: `${size}px`,
            border: `2px solid ${color}44`, borderRadius: '50%',
            pointerEvents: 'none', zIndex: '9999',
            boxShadow: `0 0 15px ${color}33, inset 0 0 15px ${color}22`,
            transform: `translate(-50%,-50%) scale(0) rotate(0deg)`,
            opacity: '0.9',
            transition: `all ${0.6 + r * 0.1}s cubic-bezier(0.34,1.56,0.64,1)`,
        });
        document.body.appendChild(ring);
        setTimeout(() => {
            ring.style.transform = `translate(-50%,-50%) scale(${1.5 + r * 0.5}) rotate(${90 + r * 45}deg)`;
        }, r * 50);
        setTimeout(() => {
            ring.style.opacity = '0';
            ring.style.transform += ' scale(0.5)';
        }, 500 + r * 80);
        setTimeout(() => ring.remove(), 900 + r * 80);
    }
    // Center glow
    const glow = document.createElement('div');
    Object.assign(glow.style, {
        position: 'fixed', left: `${cx}px`, top: `${cy}px`,
        width: '8px', height: '8px', borderRadius: '50%',
        background: `radial-gradient(circle, #fff, ${randomColor()}, transparent)`,
        pointerEvents: 'none', zIndex: '9999',
        transform: 'translate(-50%,-50%)', opacity: '1',
        transition: 'all 0.5s ease-out',
    });
    document.body.appendChild(glow);
    requestAnimationFrame(() => {
        glow.style.transform = 'translate(-50%,-50%) scale(5)';
        glow.style.opacity = '0';
    });
    setTimeout(() => glow.remove(), 600);

    // Sucking particles
    for (let i = 0; i < 16; i++) {
        const pt = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 16;
        const dist = 80 + Math.random() * 40;
        const sx = cx + Math.cos(angle) * dist;
        const sy = cy + Math.sin(angle) * dist;
        const color = randomColor();
        Object.assign(pt.style, {
            position: 'fixed', left: `${sx}px`, top: `${sy}px`,
            width: '4px', height: '4px', borderRadius: '50%',
            background: color, pointerEvents: 'none', zIndex: '9999',
            boxShadow: `0 0 6px ${color}`,
            opacity: '0.8',
            transition: 'all 0.5s cubic-bezier(0.55,0.06,0.68,0.19)',
        });
        document.body.appendChild(pt);
        setTimeout(() => {
            pt.style.left = `${cx}px`;
            pt.style.top = `${cy}px`;
            pt.style.opacity = '0';
            pt.style.transform = 'scale(0)';
        }, 50);
        setTimeout(() => pt.remove(), 600);
    }
}

// ═══ Helper: spawn flying particles ═══
function spawnParticles(cx, cy, count) {
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const angle = (Math.PI * 2 * i) / count;
        const dist = 40 + Math.random() * 60;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const color = RAINBOW[i % RAINBOW.length];
        Object.assign(p.style, {
            position: 'fixed', left: `${cx}px`, top: `${cy}px`,
            width: `${4 + Math.random() * 4}px`,
            height: `${4 + Math.random() * 4}px`,
            background: color, borderRadius: '50%',
            boxShadow: `0 0 6px ${color}`,
            pointerEvents: 'none', zIndex: '9999',
            transform: 'translate(-50%,-50%)', opacity: '1',
            transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)',
        });
        document.body.appendChild(p);
        requestAnimationFrame(() => {
            p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.2)`;
            p.style.opacity = '0';
        });
        setTimeout(() => p.remove(), 700);
    }
}

// All effects array
const ALL_EFFECTS = [
    effectRingBurst,
    effectShockwave,
    effectDNAHelix,
    effectVortex,
    effectMatrixRain,
    effectPlasmaBurst,
    effectEMP,
    effectFireworks,
    effectPortal,
];

const ClickRipple = () => {
    const lastEffectRef = useRef(-1);

    useEffect(() => {
        const handleClick = (e) => {
            // Skip if clicking on interactive elements
            const tag = e.target.tagName.toLowerCase();
            if (['a', 'button', 'input', 'textarea', 'select'].includes(tag)) return;
            if (e.target.closest('a, button, [role="button"]')) return;

            const cx = e.clientX;
            const cy = e.clientY;

            // Pick random effect, avoiding repeating the same one
            let idx;
            do {
                idx = Math.floor(Math.random() * ALL_EFFECTS.length);
            } while (idx === lastEffectRef.current && ALL_EFFECTS.length > 1);
            lastEffectRef.current = idx;

            ALL_EFFECTS[idx](cx, cy);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return null;
};

export default ClickRipple;
