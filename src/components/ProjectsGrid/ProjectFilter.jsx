import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../models/projects';
import ProjectGrid from './ProjectGrid';

const ProjectFilter = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(project => project.category === activeCategory);

    const categories = ["All", "React", "Node", "Full Stack"];

    return (
        <section className="py-20 px-6 relative">
            <div className="neon-divider mb-20" />

            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        className="text-[11px] font-cyber text-neon-cyan/60 tracking-[6px] uppercase block mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        ◆ Creations ◆
                    </motion.span>
                    <motion.h2
                        className="text-3xl md:text-5xl font-cyber font-black gradient-text-anime mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        My Projects
                    </motion.h2>
                </div>

                {/* Filter Buttons */}
                <motion.div
                    className="flex justify-center flex-wrap gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-lg font-cyber text-xs tracking-[2px] uppercase border transition-all duration-300 ${activeCategory === cat
                                    ? 'border-neon-pink text-neon-pink bg-neon-pink/10 shadow-[0_0_15px_rgba(255,45,149,0.3)]'
                                    : 'border-neon-purple/20 text-content/50 hover:border-neon-purple/50 hover:text-content/80'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProjectGrid filteredProjects={filteredProjects} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ProjectFilter;