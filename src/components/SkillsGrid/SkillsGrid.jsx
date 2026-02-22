import { motion } from 'framer-motion';
import SkillCard from './SkillCard.jsx';
import { skills } from '../../models/skills';

const SkillGrid = () => {
    return (
        <section className="py-20 px-6 relative">
            {/* Section divider */}
            <div className="neon-divider mb-20" />

            <div className="container mx-auto">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <motion.span
                        className="text-[11px] font-cyber text-neon-purple/60 tracking-[6px] uppercase block mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        ◈ Arsenal ◈
                    </motion.span>
                    <motion.h2
                        className="text-3xl md:text-5xl font-cyber font-black gradient-text-anime mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Technical Skills
                    </motion.h2>
                    <motion.p
                        className="text-content/50 max-w-xl mx-auto font-body text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        The weapons in my coding arsenal — technologies forged in the fires of late-night sessions.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {skills.map((skill, index) => (
                        <SkillCard
                            key={skill.id}
                            name={skill.name}
                            level={skill.level}
                            icon={skill.icon}
                            color={skill.color}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillGrid;