import Hero from "../components/Hero/Hero";
import SkillGrid from "../components/SkillsGrid/SkillsGrid";
import ProjectFilter from "../components/ProjectsGrid/ProjectFilter";
import GitHubRepos from "../components/GithubRepos";

const handleHeroClick = () => {
    const projectsSection = document.querySelector('#projects-section');
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
};

const Home = (props) => {
    return (
        <>
            {/* Hero */}
            <section id="hero-section">
                <Hero
                    {...props}
                    onButtonClick={handleHeroClick}
                />
            </section>

            {/* Section divider */}
            <div className="section-divider my-8" />

            {/* Skills */}
            <section id="skills-section">
                <SkillGrid />
            </section>

            <div className="section-divider my-8" />

            {/* Projects */}
            <section id="projects-section">
                <ProjectFilter />
            </section>

            <div className="section-divider my-8" />

            {/* GitHub */}
            <section id="github-section">
                <GitHubRepos />
            </section>
        </>
    );
}

export default Home;