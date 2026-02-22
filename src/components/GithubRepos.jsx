import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DraggableCard from './common/DraggableCard';

const GitHubRepos = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const GITHUB_USERNAME = "umess-ss";

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchRepos = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
                    { signal }
                );
                if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
                const data = await response.json();
                setRepos(data);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError(err.message);
                }
            } finally {
                if (!signal.aborted) setLoading(false);
            }
        };

        fetchRepos();
        return () => controller.abort();
    }, []);

    const langColors = {
        JavaScript: '#f7df1e',
        TypeScript: '#3178c6',
        Python: '#3572A5',
        Dart: '#00B4AB',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Java: '#b07219',
    };

    return (
        <section className="py-20 px-6 relative">
            <div className="neon-divider mb-20" />

            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        className="text-[11px] font-cyber text-neon-green/60 tracking-[6px] uppercase block mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        ◈ Source Code ◈
                    </motion.span>
                    <motion.h2
                        className="text-3xl md:text-5xl font-cyber font-black gradient-text-anime mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Latest Code
                    </motion.h2>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full border-2 border-neon-purple/20 border-t-neon-pink animate-spin" />
                            <div className="absolute inset-2 rounded-full border-2 border-neon-cyan/20 border-b-neon-cyan animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                        </div>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="text-center neon-card p-6 border-neon-red/30 max-w-md mx-auto">
                        <p className="text-neon-red font-cyber text-sm">⚠️ {error}</p>
                    </div>
                )}

                {/* Repos Grid — Each card individually draggable */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {repos.map((repo, index) => (
                            <DraggableCard key={repo.id} index={index}>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="neon-card p-6 group block no-underline"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-cyber font-bold text-base text-neon-cyan group-hover:text-neon-pink transition-colors tracking-wider">
                                            {repo.name}
                                        </h3>
                                        <span className="flex items-center text-[10px] font-cyber border border-neon-yellow/30 text-neon-yellow px-2 py-0.5 rounded-full">
                                            ⭐ {repo.stargazers_count}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-content/40 text-sm mb-4 line-clamp-2 h-10 font-body">
                                        {repo.description || "No description available."}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex gap-4 text-[11px] font-cyber text-content/30">
                                        {repo.language && (
                                            <span className="flex items-center gap-1.5">
                                                <span
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: langColors[repo.language] || '#a855f7' }}
                                                />
                                                {repo.language}
                                            </span>
                                        )}
                                        <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </a>
                            </DraggableCard>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default GitHubRepos;