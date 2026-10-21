import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: { DEFAULT: '#0E1A2B', 800: '#0c1830', 700: '#111f3b', 600: '#18284a' },
        ink: '#050810',
        gold: { DEFAULT: '#D4AF37', light: '#F6DFA0', dark: '#7A5C00' },
        slate2: '#A3ABBA',
      },
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
      backgroundImage: {
        'gold-grad': 'linear-gradient(135deg,#F6DFA0 0%,#D4AF37 50%,#7A5C00 100%)',
      },
      boxShadow: { gold: '0 10px 30px -8px rgba(212,165,58,.45)' },
    },
  },
  plugins: [],
};
export default config;
