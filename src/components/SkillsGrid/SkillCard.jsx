import { motion } from 'framer-motion';
import DraggableCard from '../common/DraggableCard';

const neonColors = {
    'neon-pink': { border: '#ff2d95', shadow: 'rgba(255, 45, 149, 0.3)', bg: 'rgba(255, 45, 149, 0.05)' },
    'neon-cyan': { border: '#00f7ff', shadow: 'rgba(0, 247, 255, 0.3)', bg: 'rgba(0, 247, 255, 0.05)' },
    'neon-purple': { border: '#a855f7', shadow: 'rgba(168, 85, 247, 0.3)', bg: 'rgba(168, 85, 247, 0.05)' },
    'neon-green': { border: '#39ff14', shadow: 'rgba(57, 255, 20, 0.3)', bg: 'rgba(57, 255, 20, 0.05)' },
};

const SkillCard = ({ name, level, icon, color, index }) => {
    const neon = neonColors[color] || neonColors['neon-purple'];

    return (
        <DraggableCard index={index}>
            <motion.div
                className="neon-card p-6 group"
                style={{
                    borderColor: neon.border + '40',
                    background: `linear-gradient(135deg, ${neon.bg}, rgba(10, 5, 32, 0.9))`,
                }}
                whileHover={{
                    borderColor: neon.border,
                    boxShadow: `0 0 20px ${neon.shadow}, 0 0 40px ${neon.shadow}`,
                    y: -8,
                }}
            >
                <div className="flex flex-col items-center text-center">
                    {/* Icon with energy ring */}
                    <div className="relative mb-4">
                        <motion.span
                            className="text-4xl block"
                            whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.4 }}
                        >
                            {icon === 'octocat' ? '🐙' : icon}
                        </motion.span>
                        {/* Energy ring */}
                        <motion.div
                            className="absolute -inset-4 rounded-full border border-transparent"
                            style={{ borderColor: neon.border + '20' }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        />
                        <div
                            className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: `radial-gradient(circle, ${neon.shadow} 0%, transparent 70%)`,
                            }}
                        />
                    </div>

                    {/* Name */}
                    <h3
                        className="text-lg font-cyber font-bold mb-2 tracking-wider"
                        style={{ color: neon.border }}
                    >
                        {name}
                    </h3>

                    {/* Level Badge */}
                    <span
                        className="px-3 py-1 text-[10px] font-cyber tracking-[2px] uppercase rounded-full border"
                        style={{
                            borderColor: neon.border + '40',
                            color: neon.border,
                            background: neon.bg,
                        }}
                    >
                        {level}
                    </span>
                </div>
            </motion.div>
        </DraggableCard>
    );
};

export default SkillCard;