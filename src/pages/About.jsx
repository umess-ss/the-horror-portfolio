import { motion } from 'framer-motion';

const TIMELINE = [
    {
        year: '2024 — Present',
        title: 'Full Stack Developer & AI Engineer',
        subtitle: 'Building the Future',
        desc: 'Crafting production-ready applications with React, Node.js, Flutter, and AI/ML. Deploying intelligent solutions that bridge the gap between human intuition and machine precision.',
        icon: '🚀',
        color: '#e879f9',
    },
    {
        year: '2024',
        title: 'Fellowship — Salesforce at Cloudmandap',
        subtitle: 'Cloud Architecture',
        desc: 'Intensive fellowship mastering Salesforce ecosystem, cloud computing patterns, and enterprise-grade CRM solutions. Architected scalable data models and automated business workflows.',
        icon: '☁️',
        color: '#22d3ee',
    },
    {
        year: '2023 — 2024',
        title: 'Electronics & Communication Engineering',
        subtitle: 'IOE • Paschimanchal Campus',
        desc: 'Deep foundations in signal processing, embedded systems, and digital communications. Bridged hardware knowledge with software engineering to build IoT and edge computing solutions.',
        icon: '⚡',
        color: '#a78bfa',
    },
    {
        year: '2021',
        title: '+2 Science — Adarsha Secondary School',
        subtitle: 'Science Stream',
        desc: 'Built strong analytical foundations in physics, chemistry, mathematics, and computer science. Started the coding journey here.',
        icon: '🔬',
        color: '#34d399',
    },
];

const HARD_SKILLS = [
    'React / Next.js', 'Node.js / Express', 'Python / FastAPI', 'Flutter / Dart',
    'TypeScript', 'PostgreSQL / Supabase', 'MongoDB', 'TailwindCSS',
    'Git & GitHub', 'Docker', 'AWS Basics', 'TensorFlow / PyTorch',
    'Salesforce', 'REST & GraphQL APIs', 'CI/CD Pipelines', 'Linux/Shell',
];

const SOFT_SKILLS = [
    'Problem Solving', 'Team Leadership', 'Communication', 'Adaptability',
    'Critical Thinking', 'Time Management', 'Creativity', 'Collaboration',
];

const POWER_STATS = [
    { label: 'Projects Built', value: '15+', icon: '✨' },
    { label: 'Technologies', value: '20+', icon: '⚡' },
    { label: 'GitHub Repos', value: '30+', icon: '🐙' },
    { label: 'Coffee Consumed', value: '∞', icon: '☕' },
];

const About = () => {
    return (
        <div className="min-h-screen py-20 px-6">
            <div className="container mx-auto max-w-5xl">

                {/* Page Header */}
                <div className="text-center mb-20">
                    <motion.span
                        className="text-[11px] font-cyber text-neon-pink/60 tracking-[6px] uppercase block mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        ✦ The Origin Story ✦
                    </motion.span>
                    <motion.h1
                        className="text-4xl md:text-6xl font-cyber font-black gradient-text-anime mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        About Me
                    </motion.h1>
                    <motion.p
                        className="text-content/50 text-lg font-body max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        A market-driven full stack developer & AI enthusiast from Nepal,
                        forging digital experiences with creativity and precision.
                        I don't just write code — I engineer digital superpowers.
                    </motion.p>
                </div>

                {/* Power Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {POWER_STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="neon-card p-6 text-center group"
                            whileHover={{
                                boxShadow: '0 0 30px rgba(232,121,249,0.2)',
                                borderColor: '#e879f9',
                                y: -4,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-3xl mb-2 block">{stat.icon}</span>
                            <h3 className="text-3xl font-cyber font-black text-neon-cyan mb-1">{stat.value}</h3>
                            <p className="text-content/40 text-[10px] font-cyber tracking-[2px] uppercase">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Philosophy Section */}
                <motion.div
                    className="neon-card p-8 md:p-12 mb-20 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-neon-purple/10 rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-pink/10 rounded-full blur-[60px]" />

                    <h2 className="text-2xl md:text-3xl font-cyber font-bold gradient-text-anime mb-6">
                        🧠 The AI-Powered Developer
                    </h2>
                    <div className="space-y-4 text-content/60 font-body text-base leading-relaxed relative z-10">
                        <p>
                            In the age of generative AI and diffusion models, I've embraced the future.
                            From training neural networks to deploying edge functions powered by Gemini,
                            I believe AI isn't just a tool — it's a <span className="text-neon-cyan font-bold">creative superpower</span>.
                        </p>
                        <p>
                            I work at the intersection of <span className="text-neon-pink font-bold">human creativity</span> and
                            <span className="text-neon-purple font-bold"> machine intelligence</span> — building applications that
                            learn, adapt, and evolve. Whether it's computer vision, NLP, or recommendation engines,
                            I bring imagination and raw energy to every line of code.
                        </p>
                        <p>
                            The sun rises and sets, day transitions to night, but the code never stops.
                            Like comets streaking across the night sky, every project I build captures
                            that <span className="text-neon-green font-bold">electrifying moment of breakthrough</span>.
                        </p>
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="mb-20">
                    <motion.h2
                        className="text-2xl md:text-4xl font-cyber font-black gradient-text-anime mb-12 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Journey Timeline
                    </motion.h2>
                    <div className="relative">
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-pink via-neon-purple to-neon-cyan" />

                        {TIMELINE.map((item, i) => (
                            <motion.div
                                key={i}
                                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div
                                    className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full border-2 -translate-x-1/2 z-10"
                                    style={{
                                        borderColor: item.color,
                                        background: '#0a0a1a',
                                        boxShadow: `0 0 10px ${item.color}40`,
                                    }}
                                />

                                <div className={`ml-16 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div className="neon-card p-6">
                                        <span className="text-2xl mb-2 block">{item.icon}</span>
                                        <span
                                            className="text-[10px] font-cyber tracking-[3px] uppercase mb-1 block"
                                            style={{ color: item.color }}
                                        >
                                            {item.year}
                                        </span>
                                        <h3 className="text-lg font-cyber font-bold text-content mb-1">{item.title}</h3>
                                        <p className="text-neon-purple/60 text-xs font-cyber tracking-wider mb-3">{item.subtitle}</p>
                                        <p className="text-content/40 text-sm font-body leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        className="neon-card p-8"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-cyber font-bold text-neon-cyan mb-6 flex items-center gap-2">
                            <span>⚡</span> Hard Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {HARD_SKILLS.map((skill, i) => (
                                <motion.span
                                    key={skill}
                                    className="px-3 py-1.5 text-xs font-cyber tracking-wider rounded-lg border border-neon-cyan/20 text-neon-cyan/70 bg-neon-cyan/5 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_10px_rgba(34,211,238,0.15)] transition-all duration-300"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -2 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="neon-card p-8"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-cyber font-bold text-neon-pink mb-6 flex items-center gap-2">
                            <span>🧠</span> Soft Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {SOFT_SKILLS.map((skill, i) => (
                                <motion.span
                                    key={skill}
                                    className="px-3 py-1.5 text-xs font-cyber tracking-wider rounded-lg border border-neon-pink/20 text-neon-pink/70 bg-neon-pink/5 hover:border-neon-pink hover:text-neon-pink hover:shadow-[0_0_10px_rgba(232,121,249,0.15)] transition-all duration-300"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -2 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-content/40 font-body text-sm mb-6">
                        Ready to build something extraordinary together?
                    </p>
                    <motion.a
                        href="mailto:hello@umesh.dev"
                        className="phonk-btn rounded-xl inline-block no-underline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ✨ Let's Connect
                    </motion.a>
                </motion.div>

            </div>
        </div>
    );
};

export default About;