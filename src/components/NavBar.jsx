import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import cvFile from '../assets/cv_final_v2.pdf';

function NavBar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const navLinks = [
        { name: "Home", url: "/", icon: "⌂" },
        { name: "About", url: "/about", icon: "◈" },
        { name: "Projects", url: "/projects", icon: "◆" },
    ];

    return (
        <motion.nav
            className="flex justify-between items-center py-3 px-4 sm:px-6 mb-0 bg-void/70 backdrop-blur-xl border-b border-neon-purple/20 sticky top-0 z-50"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
                <motion.span
                    className="text-xl sm:text-2xl font-cyber font-black gradient-text-anime"
                    whileHover={{ scale: 1.05 }}
                >
                    ✦ UMESH
                </motion.span>
                <span className="text-[10px] font-cyber text-neon-purple/60 tracking-[4px] uppercase hidden sm:block">
                    .DEV
                </span>
            </Link>

            {/* Mobile hamburger */}
            <button
                className="sm:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
            >
                <motion.span
                    className="w-6 h-0.5 bg-neon-pink block"
                    animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                    className="w-6 h-0.5 bg-neon-pink block"
                    animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                    className="w-6 h-0.5 bg-neon-pink block"
                    animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                />
            </button>

            {/* Desktop Nav Links */}
            <ul className="hidden sm:flex gap-1 items-center">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.url;
                    return (
                        <li key={link.name}>
                            <Link
                                to={link.url}
                                className={`relative px-4 py-2 font-body font-semibold text-sm tracking-wider uppercase transition-all duration-300 rounded-lg ${isActive
                                    ? 'text-neon-pink neon-text-pink'
                                    : 'text-content/70 hover:text-neon-cyan'
                                    }`}
                            >
                                <span className="mr-1 text-xs">{link.icon}</span>
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-neon-pink to-neon-purple"
                                        layoutId="nav-underline"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        </li>
                    );
                })}
                <li className="ml-2">
                    <motion.a
                        href={cvFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="phonk-btn text-xs py-2 px-4 rounded-lg no-underline inline-block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        📄 RESUME
                    </motion.a>
                </li>
            </ul>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="absolute top-full left-0 right-0 bg-void/95 backdrop-blur-xl border-b border-neon-purple/20 sm:hidden z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="flex flex-col py-4 px-6 gap-2">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.url;
                                return (
                                    <li key={link.name}>
                                        <Link
                                            to={link.url}
                                            onClick={() => setMobileOpen(false)}
                                            className={`block px-4 py-3 font-body font-semibold text-sm tracking-wider uppercase transition-all duration-300 rounded-lg ${isActive
                                                ? 'text-neon-pink bg-neon-pink/10'
                                                : 'text-content/70'
                                                }`}
                                        >
                                            <span className="mr-2 text-xs">{link.icon}</span>
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="mt-2">
                                <a
                                    href={cvFile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="phonk-btn text-xs py-2 px-4 rounded-lg no-underline block text-center"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    📄 RESUME
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export default NavBar;