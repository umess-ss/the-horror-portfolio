import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="relative mt-auto border-t border-neon-purple/10">
            {/* Top divider */}
            <div className="neon-divider" />

            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-t from-void via-abyss to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Brand */}
                    <motion.div
                        className="flex flex-col space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-cyber font-black gradient-text-anime">
                            ✦ UMESH.DEV
                        </h2>
                        <p className="text-content/40 text-sm font-body leading-relaxed max-w-xs">
                            Full Stack Developer & AI Enthusiast from Nepal.
                            Crafting cosmic digital experiences with creativity and code.
                        </p>
                        {/* Status indicator */}
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green"></span>
                            </span>
                            <span className="text-neon-green/70 text-[10px] font-cyber tracking-[2px] uppercase">
                                Available for hire
                            </span>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        className="flex flex-col space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="font-cyber text-sm tracking-[3px] uppercase text-neon-purple">
                            Navigation
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'About Me', path: '/about', icon: '◈' },
                                { name: 'Projects', path: '/projects', icon: '◆' },
                            ].map(link => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-content/40 hover:text-neon-cyan transition-colors font-body text-sm flex items-center gap-2 group"
                                    >
                                        <span className="text-neon-purple/30 group-hover:text-neon-cyan transition-colors">{link.icon}</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Connect */}
                    <motion.div
                        className="flex flex-col space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="font-cyber text-sm tracking-[3px] uppercase text-neon-pink">
                            Connect
                        </h3>
                        <div className="flex gap-3">
                            {[
                                { name: '🐙 GitHub', url: 'https://github.com/umess-ss' },
                                { name: '💼 LinkedIn', url: 'https://linkedin.com' },
                                { name: '📧 Email', url: 'mailto:hello@example.com' },
                            ].map(social => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg border border-neon-purple/20 text-content/40 text-sm font-body hover:border-neon-pink/50 hover:text-neon-pink hover:bg-neon-pink/5 transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {social.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-neon-purple/10 mt-12 pt-8 text-center">
                    <p className="text-content/20 text-[10px] font-cyber tracking-[3px] uppercase">
                        © {new Date().getFullYear()} Umesh — Made with ✦ Aurora Code
                    </p>
                </div>
            </div>
        </footer>
    );
}