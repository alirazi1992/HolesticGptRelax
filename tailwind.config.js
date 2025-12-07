/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        glass: {
          100: 'rgba(255, 255, 255, 0.1)',
          200: 'rgba(255, 255, 255, 0.2)',
          300: 'rgba(255, 255, 255, 0.3)',
          400: 'rgba(255, 255, 255, 0.4)',
        },
        sunrise: {
          gold: '#FCD34D',
          'gold-dark': '#F59E0B',
          rose: '#FB7185',
          'rose-dark': '#F43F5E',
          teal: '#5EEAD4',
          'teal-dark': '#2DD4BF',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up-slow': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(24px) translateZ(0)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) translateZ(0)' 
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)' 
          },
          '33%': { 
            transform: 'translateY(-8px) rotate(2deg)' 
          },
          '66%': { 
            transform: 'translateY(-4px) rotate(-2deg)' 
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(0.95)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% center',
          },
          '100%': {
            backgroundPosition: '200% center',
          },
        },
      },
      boxShadow: {
        'warm': '0 10px 40px -10px rgba(252, 211, 77, 0.35), 0 4px 16px -4px rgba(251, 113, 133, 0.25)',
        'warm-lg': '0 20px 60px -15px rgba(252, 211, 77, 0.45), 0 8px 24px -8px rgba(251, 113, 133, 0.35)',
        'warm-xl': '0 30px 80px -20px rgba(252, 211, 77, 0.5), 0 12px 32px -12px rgba(251, 113, 133, 0.4)',
        'glow': '0 0 20px rgba(252, 211, 77, 0.4), 0 0 40px rgba(251, 113, 133, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}