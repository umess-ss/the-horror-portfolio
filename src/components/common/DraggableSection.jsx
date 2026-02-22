import { motion, useMotionValue } from 'framer-motion';

/**
 * DraggableSection wraps any child in a framer-motion drag container.
 * Each section can be dragged freely, and will return to origin on reset.
 */
const DraggableSection = ({ children, id, className = '', dragConstraints }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    return (
        <motion.div
            id={id}
            className={`relative ${className}`}
            drag
            dragConstraints={dragConstraints || { left: -300, right: 300, top: -200, bottom: 200 }}
            dragElastic={0.15}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            style={{ x, y }}
            whileDrag={{
                scale: 1.02,
                zIndex: 100,
                boxShadow: '0 0 40px rgba(255, 45, 149, 0.3), 0 0 80px rgba(168, 85, 247, 0.15)',
            }}
            whileHover={{ scale: 1.005 }}
        >
            {/* Drag indicator */}
            <div className="drag-handle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            {children}
        </motion.div>
    );
};

export default DraggableSection;
