import { Routes, Route, Outlet, useParams } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import CometCanvas from './components/common/CometCanvas';
import ClickRipple from './components/common/ClickRipple';
import AutoThemeFlip from './components/common/AutoThemeFlip';

function Layout() {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* ═══ ATMOSPHERIC LAYERS ═══ */}

            {/* Aurora background blobs */}
            <div className="aurora-bg">
                <div className="aurora-blob" />
                <div className="aurora-blob" />
                <div className="aurora-blob" />
            </div>

            {/* Comet animation canvas */}
            <CometCanvas />

            {/* Click ripple interactivity */}
            <ClickRipple />

            {/* Theme toggle */}
            <AutoThemeFlip />

            {/* ═══ CONTENT ═══ */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <NavBar />

                <main className="flex-grow">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default function App() {
    const { data } = useParams();
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={
                    <Home
                        name="Umesh Rajbanshi"
                        roles={[
                            "Full Stack Developer",
                            "AI/ML Engineer",
                            "Electronics Engineer",
                            "Developer Rising 🚀"
                        ]}
                        subtitle="Market-driven Full Stack Developer & AI Engineer. Building the future with code, caffeine, and pure imagination."
                        buttonText="View My Work"
                    />}
                />
                <Route path="about" element={<About />} />
                <Route path="projects" element={<Projects />} />
            </Route>
            <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a1a' }}>
                    <div className="text-center">
                        <h1 className="text-8xl font-cyber font-black gradient-text-anime mb-4">404</h1>
                        <p className="text-content/40 font-cyber tracking-[4px] uppercase text-sm">Lost in the cosmos</p>
                    </div>
                </div>
            } />
        </Routes>
    );
}
