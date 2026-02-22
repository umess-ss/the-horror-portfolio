/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Horror Fire Palette
        neon: {
          pink: '#ff1a1a',
          cyan: '#ff4400',
          purple: '#cc1100',
          blue: '#8b0000',
          green: '#ff6600',
          yellow: '#ff8800',
          orange: '#ff3300',
          red: '#cc0000',
        },
        // Core dark theme (horror)
        void: '#0a0000',
        abyss: '#150200',
        nebula: '#1a0300',
        cosmos: '#200500',

        // Semantic
        primary: {
          DEFAULT: '#cc1100',
          hover: '#ff3300',
        },
        secondary: '#8b0000',
        accent: '#ff4400',
        bkg: '#0a0000',
        content: '#e8d0d0',
        card: 'rgba(20, 2, 2, 0.6)',
        'card-border': 'rgba(204, 17, 0, 0.3)',
      },
      fontFamily: {
        cyber: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      animation: {
        'lightning-flash': 'lightning-flash 4s infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 2.5s infinite',
        'energy-ring': 'energy-ring 3s linear infinite',
        'star-drift': 'star-drift 80s linear infinite',
      },
      keyframes: {
        'lightning-flash': {
          '0%, 93%, 100%': { opacity: '0' },
          '94%': { opacity: '0.5' },
          '95%': { opacity: '0.15' },
          '96%': { opacity: '0.7' },
          '97%': { opacity: '0.2' },
        },
        'neon-pulse': {
          '0%': {
            textShadow: '0 0 4px #ff1a1a, 0 0 11px #cc0000, 0 0 19px #8b0000',
          },
          '100%': {
            textShadow: '0 0 4px #ff4400, 0 0 11px #ff3300, 0 0 19px #cc1100, 0 0 40px #8b0000',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(-3px, -3px)' },
          '60%': { transform: 'translate(3px, 3px)' },
          '80%': { transform: 'translate(3px, -3px)' },
          '100%': { transform: 'translate(0)' },
        },
        'energy-ring': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'star-drift': {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '100%': { transform: 'translateY(-2000px) translateX(-500px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(204, 17, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(204, 17, 0, 0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}