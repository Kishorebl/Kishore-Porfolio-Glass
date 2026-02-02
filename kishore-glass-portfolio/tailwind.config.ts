import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        glass: {
          100: 'rgba(255, 255, 255, 0.08)',
          200: 'rgba(255, 255, 255, 0.12)',
          300: 'rgba(255, 255, 255, 0.2)',
        },
        ink: {
          50: '#f5f7ff',
          100: '#e0e7ff',
          200: '#b8c2ff',
          300: '#9aa7ff',
          400: '#7b88ff',
          500: '#5964ff',
          600: '#434af5',
        },
      },
      boxShadow: {
        'glass-soft': '0 20px 50px rgba(15, 23, 42, 0.35)',
        'glass-ring': 'inset 0 0 0 1px rgba(255, 255, 255, 0.24)',
        'glass-button': '0 12px 30px rgba(59, 130, 246, 0.35)',
      },
      backdropBlur: {
        glass: '18px',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top left, rgba(99, 102, 241, 0.35), transparent 55%), radial-gradient(circle at top right, rgba(59, 130, 246, 0.35), transparent 50%), radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.25), transparent 50%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        spinSlow: 'spinSlow 28s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
