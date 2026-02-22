import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import TypingText from '../common/TypingText';

const CODE_SYMBOLS = [
    '{ }', '< />', 'fn()', '=>', 'const', '[ ]', '&&', '||',
    '!==', '**', 'async', 'npm', 'git', 'def', '::',
    'import', 'class', 'void', '0xFF', '+=', 'API',
    '</>', '#!', '$_', '<?>', '>>>',
];

const Hero = (props) => {
    const [nameComplete, setNameComplete] = useState(false);

    return (
        <section className={`${styles.heroWrapper} transition-all duration-1000 text-center`}>

            {/* Floating aurora orbs */}
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full bg-neon-pink/5 blur-[100px] -top-20 -right-20 hidden sm:block"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute w-[200px] h-[200px] rounded-full bg-neon-cyan/5 blur-[80px] bottom-10 -left-20 hidden sm:block"
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />
            <motion.div
                className="absolute w-[150px] h-[150px] rounded-full bg-neon-purple/5 blur-[60px] top-1/3 right-10 hidden sm:block"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 12, repeat: Infinity, delay: 4 }}
            />

            {/* Floating code symbols — replaces Japanese kanji */}
            {CODE_SYMBOLS.map((char, i) => (
                <motion.span
                    key={i}
                    className="absolute font-mono pointer-events-none select-none hidden md:block"
                    style={{
                        fontSize: `${12 + Math.random() * 16}px`,
                        left: `${3 + (i * (94 / CODE_SYMBOLS.length))}%`,
                        top: `${8 + Math.random() * 75}%`,
                        color: `hsla(${[270, 190, 320, 160, 45][i % 5]}, 70%, 70%, 0.07)`,
                        fontWeight: 600,
                    }}
                    animate={{
                        y: [-12, 12, -12],
                        opacity: [0.04, 0.1, 0.04],
                        rotate: [-3, 3, -3],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 4,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                >
                    {char}
                </motion.span>
            ))}

            <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 mb-6 relative z-10 px-4">

                {/* Subtitle tagline — with shimmer */}
                <motion.span
                    className="text-[9px] sm:text-[10px] font-cyber text-neon-purple/50 tracking-[6px] sm:tracking-[8px] uppercase"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    ✦ The Developer Rising ✦
                </motion.span>

                {/* Name — clean, no box */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className={`${styles.gradientTitle} font-cyber relative`}>
                        <TypingText
                            texts={props.name}
                            loop={false}
                            typingSpeed={80}
                            hideCursorOnComplete={true}
                            onComplete={() => setTimeout(() => setNameComplete(true), 500)}
                        />
                    </h1>
                </motion.div>

                {/* Role text — slides in with spring */}
                <motion.div
                    className="h-[1.4em] text-base sm:text-lg md:text-2xl lg:text-3xl font-cyber font-bold text-neon-cyan px-4 sm:px-6 py-2 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -80, rotateZ: -3 }}
                    animate={nameComplete ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
                    transition={{ duration: 0.7, type: 'spring', stiffness: 120, damping: 14 }}
                >
                    <TypingText
                        texts={props.roles}
                        enabled={nameComplete}
                        typingSpeed={60}
                        clearingSpeed={35}
                        pauseTime={1500}
                    />
                </motion.div>

                {/* Power taglines — pop in with stagger */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-2"
                    initial={{ opacity: 0 }}
                    animate={nameComplete ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {['✨ Market Driven', '⚡ Clean Code', '🚀 Full Stack', '🎯 Problem Solver'].map((tag, i) => (
                        <motion.span
                            key={tag}
                            className="surprise-hover px-2 sm:px-3 py-1 text-[8px] sm:text-[9px] font-cyber tracking-[1px] sm:tracking-[2px] uppercase rounded-full border border-neon-purple/20 text-neon-purple/60 bg-neon-purple/5"
                            initial={{ opacity: 0, y: 20, scale: 0.5 }}
                            animate={nameComplete ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{
                                delay: 0.6 + i * 0.12,
                                type: 'spring',
                                stiffness: 200,
                                damping: 12,
                            }}
                            whileHover={{
                                borderColor: '#e879f9',
                                color: '#e879f9',
                                boxShadow: '0 0 25px rgba(232, 121, 249, 0.25)',
                                scale: 1.12,
                            }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
                className="text-content/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-body font-medium relative z-10 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={nameComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
                {props.subtitle}
            </motion.p>

            {/* CTA Button — enters with a punch */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
                animate={nameComplete ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{
                    duration: 0.7,
                    delay: 0.4,
                    type: 'spring',
                    stiffness: 180,
                    damping: 12,
                }}
            >
                <motion.button
                    onClick={props.onButtonClick}
                    className="phonk-btn rounded-xl"
                    whileHover={{
                        scale: 1.08,
                        boxShadow: '0 0 40px rgba(232, 121, 249, 0.4), 0 0 80px rgba(167, 139, 250, 0.2)',
                    }}
                    whileTap={{ scale: 0.92 }}
                >
                    {props.buttonText}
                </motion.button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={nameComplete ? { opacity: 1 } : {}}
                transition={{ delay: 1.5 }}
            >
                <span className="text-[10px] font-cyber text-neon-purple/50 tracking-[4px] uppercase">Scroll</span>
                <motion.div
                    className="w-[1px] h-8 bg-gradient-to-b from-neon-purple/50 to-transparent"
                    animate={{ scaleY: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

        </section>
    );
};

export default Hero;