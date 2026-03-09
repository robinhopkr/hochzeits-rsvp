import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffcf7',
          100: '#faf3e8',
          200: '#f4e5cf',
          300: '#ecd4ad',
          400: '#ddb783',
          500: '#c99a60',
          600: '#a97a44',
          700: '#825d34',
          800: '#5b4027',
          900: '#35241a',
        },
        gold: {
          50: '#fff8e5',
          100: '#fef0c2',
          200: '#fde08e',
          300: '#f8cd5a',
          400: '#edb93b',
          500: '#d49a1d',
          600: '#af7a11',
          700: '#875b10',
          800: '#614111',
          900: '#3d280d',
        },
        sage: {
          50: '#f6faf4',
          100: '#eaf3e4',
          200: '#d3e4ca',
          300: '#b1cfa7',
          400: '#87b07a',
          500: '#648d5c',
          600: '#4c6f47',
          700: '#3b5637',
          800: '#2a3d28',
          900: '#18231a',
        },
        charcoal: {
          50: '#f5f5f6',
          100: '#e6e7e9',
          200: '#cfd2d7',
          300: '#aeb4bc',
          400: '#858e99',
          500: '#69717b',
          600: '#525962',
          700: '#41464d',
          800: '#282c31',
          900: '#15181c',
        },
        'dusty-rose': {
          50: '#fff4f4',
          100: '#fce6e5',
          200: '#f8cecb',
          300: '#efa8a5',
          400: '#e17b79',
          500: '#c95a58',
          600: '#a14141',
          700: '#7a3132',
          800: '#552324',
          900: '#311617',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'Arial', 'sans-serif'],
      },
      fontSize: {
        hero: [
          'clamp(3rem, 8vw, 6rem)',
          {
            lineHeight: '0.95',
            letterSpacing: '-0.04em',
          },
        ],
        section: [
          'clamp(2rem, 5vw, 3.5rem)',
          {
            lineHeight: '1.05',
            letterSpacing: '-0.03em',
          },
        ],
        card: [
          'clamp(1.25rem, 2vw, 1.5rem)',
          {
            lineHeight: '1.25',
          },
        ],
      },
      spacing: {
        section: 'clamp(4rem, 8vw, 7rem)',
        hero: 'clamp(5rem, 12vw, 8rem)',
      },
      boxShadow: {
        elegant: '0 18px 60px rgba(21, 24, 28, 0.08)',
        gold: '0 14px 36px rgba(212, 154, 29, 0.18)',
      },
      borderRadius: {
        elegant: '1.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(18px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
        shimmer: 'shimmer 1.8s linear infinite',
      },
    },
  },
  plugins: [forms],
}

export default config
