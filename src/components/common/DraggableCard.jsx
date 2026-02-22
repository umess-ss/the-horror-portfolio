import { motion } from 'framer-motion';

/**
 * DraggableCard — wraps any individual card to make it freely draggable.
 * Snaps back with elastic physics. Shows neon glow while dragging.
 */
const DraggableCard = ({ children, className = '', index = 0 }) => {
    return (
        <motion.div
            className={`relative ${className}`}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.4}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 15 }}
            whileDrag={{
                scale: 1.08,
                zIndex: 200,
                rotate: Math.random() > 0.5 ? 2 : -2,
                boxShadow: '0 0 30px rgba(255, 45, 149, 0.5), 0 0 60px rgba(168, 85, 247, 0.3), 0 0 90px rgba(0, 247, 255, 0.15)',
                filter: 'brightness(1.2)',
            }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-30px' }}
            style={{ cursor: 'grab' }}
        >
            {children}
        </motion.div>
    );
};

export default DraggableCard;
