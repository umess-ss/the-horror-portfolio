import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import TypingText from '../common/TypingText';

const KANJI = ['炎', '血', '闇', '魔', '鬼', '死', '影', '龍'];

const Hero = (props) => {
    const [nameComplete, setNameComplete] = useState(false);

    return (
        <section className={`${styles.heroWrapper} transition-all duration-1000 text-center`}>

            {/* Floating fire orbs */}
            <div className="planet-orb w-[400px] h-[400px] bg-neon-pink -top-20 -right-20 hidden sm:block" style={{ animationDelay: '0s' }} />
            <div className="planet-orb w-[250px] h-[250px] bg-neon-red bottom-10 -left-20 hidden sm:block" style={{ animationDelay: '3s' }} />
            <div className="planet-orb w-[180px] h-[180px] bg-neon-orange top-1/2 right-10 hidden sm:block" style={{ animationDelay: '5s' }} />
            <div className="planet-orb w-[120px] h-[120px] bg-neon-cyan top-20 left-1/4" style={{ animationDelay: '2s' }} />

            {/* Floating horror kanji */}
            {KANJI.map((char, i) => (
                <motion.span
                    key={i}
                    className="absolute text-neon-pink/10 font-bold pointer-events-none select-none hidden md:block"
                    style={{
                        fontSize: `${30 + Math.random() * 40}px`,
                        left: `${10 + (i * 12)}%`,
                        top: `${15 + Math.random() * 60}%`,
                    }}
                    animate={{
                        y: [-10, 10, -10],
                        opacity: [0.03, 0.1, 0.03],
                        rotate: [-5, 5, -5],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                >
                    {char}
                </motion.span>
            ))}

            <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 mb-6 relative z-10 px-4">

                {/* Dark energy aura behind name */}
                <motion.div
                    className="absolute -inset-10 rounded-full pointer-events-none"
                    animate={{
                        boxShadow: [
                            '0 0 60px rgba(255,26,26,0.1), 0 0 120px rgba(139,0,0,0.05)',
                            '0 0 80px rgba(255,68,0,0.12), 0 0 160px rgba(204,17,0,0.06)',
                            '0 0 60px rgba(139,0,0,0.1), 0 0 120px rgba(255,26,26,0.05)',
                        ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Subtitle tagline */}
                <motion.span
                    className="text-[9px] sm:text-[10px] font-cyber text-neon-purple/50 tracking-[6px] sm:tracking-[8px] uppercase"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    ◈ The Developer Rising ◈
                </motion.span>

                {/* Name with glitch effect */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
                    {/* Glitch layers */}
                    <div
                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        aria-hidden="true"
                    >
                        <span className={`${styles.gradientTitle} font-cyber absolute inset-0 animate-[glitch-1_2s_infinite]`}
                            style={{ clipPath: 'inset(20% 0 60% 0)', WebkitTextFillColor: 'rgba(255,26,26,0.3)' }}
                        />
                        <span className={`${styles.gradientTitle} font-cyber absolute inset-0 animate-[glitch-2_2s_infinite]`}
                            style={{ clipPath: 'inset(60% 0 20% 0)', WebkitTextFillColor: 'rgba(204,17,0,0.3)' }}
                        />
                    </div>
                </motion.div>

                {/* Role text */}
                <motion.div
                    className="h-[1.4em] text-base sm:text-lg md:text-2xl lg:text-3xl font-cyber font-bold text-neon-cyan px-4 sm:px-6 py-2 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={nameComplete ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <TypingText
                        texts={props.roles}
                        enabled={nameComplete}
                        typingSpeed={60}
                        clearingSpeed={35}
                        pauseTime={1500}
                    />
                </motion.div>

                {/* Power taglines */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-2"
                    initial={{ opacity: 0 }}
                    animate={nameComplete ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {['⚡ Market Driven', '🔥 Fire Code', '💀 Full Stack Beast', '🩸 Problem Slayer'].map((tag, i) => (
                        <motion.span
                            key={tag}
                            className="px-2 sm:px-3 py-1 text-[8px] sm:text-[9px] font-cyber tracking-[1px] sm:tracking-[2px] uppercase rounded-full border border-neon-purple/20 text-neon-purple/60 bg-neon-purple/5"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={nameComplete ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            whileHover={{
                                borderColor: '#ff1a1a',
                                color: '#ff1a1a',
                                boxShadow: '0 0 15px rgba(255,26,26,0.3)',
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
                initial={{ opacity: 0, y: 20 }}
                animate={nameComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {props.subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={nameComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <motion.button
                    onClick={props.onButtonClick}
                    className="phonk-btn rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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