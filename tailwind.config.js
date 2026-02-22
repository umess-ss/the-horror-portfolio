/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cyber: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
        body: ['"Inter"', '"Noto Sans"', 'sans-serif'],
      },
      colors: {
        /* ═══ ANIME AURORA PALETTE ═══ */
        neon: {
          pink: '#e879f9',      // Sakura pink / fuchsia
          cyan: '#22d3ee',      // Aurora cyan
          purple: '#a78bfa',    // Soft violet
          blue: '#818cf8',      // Indigo bloom
          green: '#34d399',     // Emerald glow
          yellow: '#fbbf24',    // Golden spark
          orange: '#fb923c',    // Sunset flare
        },

        /* Core theme */
        void: '#0a0a1a',        // Deep space navy
        abyss: '#0f0f2e',       // Midnight indigo
        content: '#e2e8f0',     // Soft white
        surface: '#1a1a3e',     // Card surfaces
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'comet': 'comet 8s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'aurora-drift': 'aurora-drift 12s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        comet: {
          '0%': { transform: 'translateX(-100vw) translateY(100vh)', opacity: '0' },
          '5%': { opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw) translateY(-100vh)', opacity: '0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        'aurora-drift': {
          '0%, 100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateX(30px) translateY(-20px) rotate(5deg)' },
          '66%': { transform: 'translateX(-20px) translateY(10px) rotate(-3deg)' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
}