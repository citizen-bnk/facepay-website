import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: { DEFAULT: '#081020', 800: '#0c1830', 700: '#111f3b', 600: '#18284a' },
        ink: '#050810',
        gold: { DEFAULT: '#D4A53A', light: '#F2CE6B', dark: '#B8862B' },
        slate2: '#A3ABBA',
      },
      fontFamily: { sans: ['"Montserrat Variable"', 'Montserrat', 'system-ui', 'sans-serif'] },
      backgroundImage: {
        'gold-grad': 'linear-gradient(135deg,#F2CE6B 0%,#D4A53A 50%,#B8862B 100%)',
      },
      boxShadow: { gold: '0 10px 30px -8px rgba(212,165,58,.45)' },
    },
  },
  plugins: [],
};
export default config;
