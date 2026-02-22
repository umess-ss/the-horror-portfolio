import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
    const [theme, setTheme] = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-accent/30 hover:bg-accent/50 transition-all"
            aria-label="Toggle Dark Mode"
        >
            {theme === "dark" ? "🌞" : "🌙"}
        </button>
    );
}