import { useState, useCallback } from 'react';
import Hero from "../components/Hero/Hero";
import SkillGrid from "../components/SkillsGrid/SkillsGrid";
import ProjectFilter from "../components/ProjectsGrid/ProjectFilter";
import GitHubRepos from "../components/GithubRepos";
import DraggableSection from "../components/common/DraggableSection";
import ResetButton from "../components/common/ResetButton";

const handleHeroClick = () => {
    const skillsSection = document.querySelector('#skills-section');
    if (skillsSection) {
        skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
};

const Home = (props) => {
    // Reset key — incrementing forces all DraggableSections to remount
    const [resetKey, setResetKey] = useState(0);

    const handleReset = useCallback(() => {
        setResetKey(prev => prev + 1);
    }, []);

    return (
        <>
            {/* Hero — Draggable */}
            <DraggableSection
                key={`hero-${resetKey}`}
                id="hero-section"
                dragConstraints={{ left: -400, right: 400, top: -200, bottom: 200 }}
            >
                <Hero
                    {...props}
                    onButtonClick={handleHeroClick}
                />
            </DraggableSection>

            {/* Skills — Draggable */}
            <DraggableSection
                key={`skills-${resetKey}`}
                id="skills-section"
                dragConstraints={{ left: -300, right: 300, top: -150, bottom: 150 }}
            >
                <SkillGrid />
            </DraggableSection>

            {/* Projects — Draggable */}
            <DraggableSection
                key={`projects-${resetKey}`}
                id="projects-section"
                dragConstraints={{ left: -300, right: 300, top: -150, bottom: 150 }}
            >
                <ProjectFilter />
            </DraggableSection>

            {/* GitHub — Draggable */}
            <DraggableSection
                key={`github-${resetKey}`}
                id="github-section"
                dragConstraints={{ left: -300, right: 300, top: -150, bottom: 150 }}
            >
                <GitHubRepos />
            </DraggableSection>

            {/* Reset button — bottom right */}
            <ResetButton onReset={handleReset} />
        </>
    );
}

export default Home;