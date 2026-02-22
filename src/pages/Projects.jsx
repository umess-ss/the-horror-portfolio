import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DraggableCard from '../components/common/DraggableCard';

const ALL_PROJECTS = [
    {
        id: 1,
        title: 'E-Commerce Dashboard',
        category: 'React',
        tech: ['React', 'TailwindCSS', 'Chart.js', 'REST API'],
        description: 'A comprehensive dashboard for tracking sales, inventory, and analytics. Real-time data visualization with interactive charts and responsive design.',
        image: 'https://placehold.co/600x400/0a0520/ff2d95?text=E-Commerce',
        github: '#',
        live: '#',
        featured: true,
    },
    {
        id: 2,
        title: 'API Rate Limiter',
        category: 'Node',
        tech: ['Node.js', 'Express', 'Redis', 'Docker'],
        description: 'Express middleware to prevent DDoS attacks using Redis-backed rate limiting. Configurable windows, IP whitelisting, and distributed architecture support.',
        image: 'https://placehold.co/600x400/0a0520/00f7ff?text=API+Limiter',
        github: '#',
        featured: false,
    },
    {
        id: 3,
        title: 'Portfolio Website',
        category: 'React',
        tech: ['React', 'Vite', 'TailwindCSS', 'Framer Motion'],
        description: 'This very portfolio — built with anime energy, phonk aesthetics, and neon cyberpunk vibes. Draggable components, lightning effects, and AI-powered design.',
        image: 'https://placehold.co/600x400/0a0520/a855f7?text=Portfolio',
        github: 'https://github.com/umess-ss',
        featured: true,
    },
    {
        id: 4,
        title: 'HamroAwaj',
        category: 'Full Stack',
        tech: ['React', 'Django', 'PostgreSQL', 'JWT Auth'],
        description: 'Community complaint management platform with real-time tracking, admin panel, Google Maps integration, and role-based access control.',
        image: 'https://placehold.co/600x400/0a0520/39ff14?text=HamroAwaj',
        github: '#',
        featured: true,
    },
    {
        id: 5,
        title: 'Agentic Enterprise Dashboard',
        category: 'Flutter',
        tech: ['Flutter', 'Supabase', 'Gemini AI', 'Real-time'],
        description: 'Multi-agent AI dashboard with real-time streaming, human-in-the-loop approvals, and edge functions powered by Google Gemini.',
        image: 'https://placehold.co/600x400/0a0520/ffd700?text=AI+Dashboard',
        github: 'https://github.com/umess-ss/agentic-enterprice-dashboard',
        featured: true,
    },
    {
        id: 6,
        title: 'AI Image Generator',
        category: 'AI/ML',
        tech: ['Python', 'PyTorch', 'Stable Diffusion', 'FastAPI'],
        description: 'Generative AI pipeline using diffusion models for image creation. Fine-tuned on custom datasets with prompt engineering and LoRA adapters.',
        image: 'https://placehold.co/600x400/0a0520/ff6b35?text=AI+Gen',
        github: '#',
        featured: false,
    },
];

const CATEGORIES = ['All', 'React', 'Node', 'Full Stack', 'Flutter', 'AI/ML'];

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredId, setHoveredId] = useState(null);

    const filtered = activeCategory === 'All'
        ? ALL_PROJECTS
        : ALL_PROJECTS.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen py-20 px-6">
            <div className="container mx-auto max-w-6xl">

                {/* Page Header */}
                <div className="text-center mb-16">
                    <motion.span
                        className="text-[11px] font-cyber text-neon-cyan/60 tracking-[6px] uppercase block mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        ◈ Digital Creations ◈
                    </motion.span>
                    <motion.h1
                        className="text-4xl md:text-6xl font-cyber font-black gradient-text-anime mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        My Projects
                    </motion.h1>
                    <motion.p
                        className="text-content/50 text-lg font-body max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Each project is a lightning strike — a moment where the force of imagination
                        meets the precision of engineering. From AI beasts to full-stack fortresses.
                    </motion.p>
                </div>

                {/* Category Filter */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {CATEGORIES.map(cat => (
                        <motion.button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 font-cyber text-xs tracking-[2px] uppercase rounded-lg border transition-all duration-300 ${activeCategory === cat
                                    ? 'border-neon-pink text-neon-pink bg-neon-pink/10 shadow-[0_0_15px_rgba(255,45,149,0.3)]'
                                    : 'border-neon-purple/20 text-content/40 hover:border-neon-purple/50 hover:text-content/70'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {filtered.map((project, index) => (
                            <DraggableCard key={project.id} index={index}>
                                <motion.div
                                    className="neon-card overflow-hidden group relative"
                                    onHoverStart={() => setHoveredId(project.id)}
                                    onHoverEnd={() => setHoveredId(null)}
                                    whileHover={{ y: -6 }}
                                >
                                    {/* Featured badge */}
                                    {project.featured && (
                                        <div className="absolute top-3 left-3 z-20 px-2 py-1 text-[8px] font-cyber tracking-[2px] uppercase rounded-full border border-neon-yellow/40 text-neon-yellow bg-void/80 backdrop-blur-sm">
                                            ⭐ Featured
                                        </div>
                                    )}

                                    {/* Image */}
                                    <div className="overflow-hidden relative h-48">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />

                                        {/* Category */}
                                        <span className="absolute top-3 right-3 px-3 py-1 text-[10px] font-cyber tracking-[2px] uppercase rounded-full border border-neon-cyan/30 text-neon-cyan bg-void/80 backdrop-blur-sm">
                                            {project.category}
                                        </span>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-cyber font-bold text-neon-pink mb-2 tracking-wider">
                                            {project.title}
                                        </h3>

                                        <p className="text-content/40 font-body mb-4 text-sm leading-relaxed line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {project.tech.map(t => (
                                                <span key={t} className="px-2 py-0.5 text-[9px] font-cyber tracking-wider rounded border border-neon-purple/20 text-neon-purple/60">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <motion.a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 py-2.5 border border-neon-purple/30 text-neon-purple font-cyber text-xs tracking-[2px] uppercase rounded-lg hover:bg-neon-purple/10 hover:border-neon-purple hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 text-center no-underline block"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                ⚡ Code
                                            </motion.a>
                                            {project.live && (
                                                <motion.a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 py-2.5 border border-neon-cyan/30 text-neon-cyan font-cyber text-xs tracking-[2px] uppercase rounded-lg hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,247,255,0.3)] transition-all duration-300 text-center no-underline block"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    🌐 Live
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </DraggableCard>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <motion.p
                        className="text-center text-content/40 font-cyber text-sm tracking-wider py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        ◈ No projects found in this dimension ◈
                    </motion.p>
                )}

                {/* Bottom callout */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="neon-card p-8 max-w-lg mx-auto">
                        <h3 className="text-xl font-cyber font-bold gradient-text-anime mb-4">
                            Want to see more?
                        </h3>
                        <p className="text-content/40 font-body text-sm mb-6">
                            Check out my GitHub for the latest code drops and open-source contributions.
                        </p>
                        <motion.a
                            href="https://github.com/umess-ss"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="phonk-btn rounded-xl inline-block no-underline"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🐙 GitHub Profile
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Projects;