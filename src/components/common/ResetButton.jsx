import { motion } from 'framer-motion';

const ResetButton = ({ onReset }) => {
    return (
        <motion.button
            className="reset-btn"
            onClick={onReset}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            title="Reset all positions"
            aria-label="Reset component positions"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
        >
            ↻
        </motion.button>
    );
};

export default ResetButton;
