import { motion } from 'framer-motion';
import DraggableCard from '../common/DraggableCard';

const ProjectGrid = (props) => {
    const { filteredProjects } = props;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
                <DraggableCard key={project.id} index={index}>
                    <motion.div
                        className="neon-card overflow-hidden group"
                        whileHover={{ y: -6 }}
                    >
                        {/* Image with overlay */}
                        <div className="overflow-hidden relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />

                            {/* Category badge */}
                            <span className="absolute top-3 right-3 px-3 py-1 text-[10px] font-cyber tracking-[2px] uppercase rounded-full border border-neon-cyan/30 text-neon-cyan bg-void/80 backdrop-blur-sm">
                                {project.category}
                            </span>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-cyber font-bold text-neon-pink mb-2 tracking-wider">
                                {project.title}
                            </h3>

                            <p className="text-content/50 font-body mb-5 text-sm leading-relaxed">
                                {project.description}
                            </p>

                            <motion.button
                                className="w-full py-2.5 border border-neon-purple/30 text-neon-purple font-cyber text-xs tracking-[2px] uppercase rounded-lg hover:bg-neon-purple/10 hover:border-neon-purple hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                ⚡ View Code
                            </motion.button>
                        </div>
                    </motion.div>
                </DraggableCard>
            ))}

            {filteredProjects.length === 0 && (
                <p className="text-center col-span-full text-content/40 font-cyber text-sm tracking-wider py-12">
                    ◈ No projects found in this dimension ◈
                </p>
            )}
        </div>
    );
}

export default ProjectGrid;