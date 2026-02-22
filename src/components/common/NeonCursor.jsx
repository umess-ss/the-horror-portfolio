import { useEffect, useRef, useState } from 'react';

const NeonCursor = () => {
    const outerRef = useRef(null);
    const innerRef = useRef(null);
    const trailRef = useRef(null);
    const mouse = useRef({ x: -100, y: -100 });
    const outerPos = useRef({ x: -100, y: -100 });
    const trailPos = useRef({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect touch device
        const checkMobile = () => {
            setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        const onMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        const onOver = (e) => {
            if (e.target.closest('a, button, [role="button"], .neon-card, input, textarea')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseover', onOver, { passive: true });

        let animId;
        const lerp = (a, b, t) => a + (b - a) * t;

        const tick = () => {
            // Inner dot — instant follow
            if (innerRef.current) {
                innerRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
            }

            // Outer ring — smooth follow
            outerPos.current.x = lerp(outerPos.current.x, mouse.current.x, 0.15);
            outerPos.current.y = lerp(outerPos.current.y, mouse.current.y, 0.15);
            if (outerRef.current) {
                const size = isHovering ? 44 : 24;
                outerRef.current.style.transform = `translate(${outerPos.current.x - size / 2}px, ${outerPos.current.y - size / 2}px)`;
                outerRef.current.style.width = `${size}px`;
                outerRef.current.style.height = `${size}px`;
            }

            // Trail cursor — slow ember trail
            trailPos.current.x = lerp(trailPos.current.x, mouse.current.x, 0.06);
            trailPos.current.y = lerp(trailPos.current.y, mouse.current.y, 0.06);
            if (trailRef.current) {
                trailRef.current.style.transform = `translate(${trailPos.current.x - 18}px, ${trailPos.current.y - 18}px)`;
            }

            animId = requestAnimationFrame(tick);
        };

        tick();

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            window.removeEventListener('resize', checkMobile);
            cancelAnimationFrame(animId);
        };
    }, [isHovering]);

    if (isMobile) return null;

    return (
        <>
            {/* Ember trail — slow-following fire glow */}
            <div
                ref={trailRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 99997,
                    background: 'radial-gradient(circle, rgba(255,60,20,0.35) 0%, rgba(180,20,0,0.15) 40%, transparent 70%)',
                    boxShadow: '0 0 25px rgba(255,60,20,0.3), 0 0 50px rgba(180,20,0,0.15)',
                    willChange: 'transform',
                    mixBlendMode: 'screen',
                }}
            />

            {/* Outer ring — horror red ring */}
            <div
                ref={outerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '24px',
                    height: '24px',
                    border: `2px solid ${isHovering ? '#ff4444' : '#cc1100'}`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    willChange: 'transform',
                    mixBlendMode: 'difference',
                    transition: 'width 0.2s, height 0.2s, border-color 0.3s',
                    boxShadow: isHovering
                        ? '0 0 12px rgba(255,68,68,0.6), 0 0 24px rgba(255,40,40,0.3)'
                        : '0 0 8px rgba(204,17,0,0.4)',
                }}
            />

            {/* Inner dot — instant follow burning core */}
            <div
                ref={innerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '8px',
                    height: '8px',
                    background: '#ff3300',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    willChange: 'transform',
                    boxShadow: '0 0 8px #ff3300, 0 0 16px rgba(255,51,0,0.6), 0 0 32px rgba(255,30,0,0.3)',
                }}
            />
        </>
    );
};

export default NeonCursor;
