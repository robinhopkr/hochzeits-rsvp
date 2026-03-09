import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

function colorVariable(variableName: string): string {
  return `rgb(var(${variableName}) / <alpha-value>)`
}

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: colorVariable('--color-cream-50'),
          100: colorVariable('--color-cream-100'),
          200: colorVariable('--color-cream-200'),
          300: colorVariable('--color-cream-300'),
          400: colorVariable('--color-cream-400'),
          500: colorVariable('--color-cream-500'),
          600: colorVariable('--color-cream-600'),
          700: colorVariable('--color-cream-700'),
          800: colorVariable('--color-cream-800'),
          900: colorVariable('--color-cream-900'),
        },
        gold: {
          50: colorVariable('--color-gold-50'),
          100: colorVariable('--color-gold-100'),
          200: colorVariable('--color-gold-200'),
          300: colorVariable('--color-gold-300'),
          400: colorVariable('--color-gold-400'),
          500: colorVariable('--color-gold-500'),
          600: colorVariable('--color-gold-600'),
          700: colorVariable('--color-gold-700'),
          800: colorVariable('--color-gold-800'),
          900: colorVariable('--color-gold-900'),
        },
        sage: {
          50: colorVariable('--color-sage-50'),
          100: colorVariable('--color-sage-100'),
          200: colorVariable('--color-sage-200'),
          300: colorVariable('--color-sage-300'),
          400: colorVariable('--color-sage-400'),
          500: colorVariable('--color-sage-500'),
          600: colorVariable('--color-sage-600'),
          700: colorVariable('--color-sage-700'),
          800: colorVariable('--color-sage-800'),
          900: colorVariable('--color-sage-900'),
        },
        charcoal: {
          50: colorVariable('--color-charcoal-50'),
          100: colorVariable('--color-charcoal-100'),
          200: colorVariable('--color-charcoal-200'),
          300: colorVariable('--color-charcoal-300'),
          400: colorVariable('--color-charcoal-400'),
          500: colorVariable('--color-charcoal-500'),
          600: colorVariable('--color-charcoal-600'),
          700: colorVariable('--color-charcoal-700'),
          800: colorVariable('--color-charcoal-800'),
          900: colorVariable('--color-charcoal-900'),
        },
        'dusty-rose': {
          50: colorVariable('--color-dusty-rose-50'),
          100: colorVariable('--color-dusty-rose-100'),
          200: colorVariable('--color-dusty-rose-200'),
          300: colorVariable('--color-dusty-rose-300'),
          400: colorVariable('--color-dusty-rose-400'),
          500: colorVariable('--color-dusty-rose-500'),
          600: colorVariable('--color-dusty-rose-600'),
          700: colorVariable('--color-dusty-rose-700'),
          800: colorVariable('--color-dusty-rose-800'),
          900: colorVariable('--color-dusty-rose-900'),
        },
      },
      fontFamily: {
        display: ['var(--font-display-active)', 'Georgia', 'serif'],
        body: ['var(--font-body-active)', 'Arial', 'sans-serif'],
      },
      fontSize: {
        eyebrow: [
          'clamp(0.74rem, 0.65rem + 0.25vw, 0.84rem)',
          {
            lineHeight: '1.2',
            letterSpacing: '0.22em',
          },
        ],
        'body-md': [
          'clamp(0.98rem, 0.92rem + 0.18vw, 1.05rem)',
          {
            lineHeight: '1.8',
          },
        ],
        'body-lg': [
          'clamp(1.02rem, 0.96rem + 0.32vw, 1.15rem)',
          {
            lineHeight: '1.85',
          },
        ],
        hero: [
          'clamp(2.65rem, 7vw, 5.2rem)',
          {
            lineHeight: '0.98',
            letterSpacing: '-0.04em',
          },
        ],
        section: [
          'clamp(1.9rem, 4.2vw, 3rem)',
          {
            lineHeight: '1.08',
            letterSpacing: '-0.03em',
          },
        ],
        metric: [
          'clamp(2rem, 3vw, 2.8rem)',
          {
            lineHeight: '1',
            letterSpacing: '-0.03em',
          },
        ],
        card: [
          'clamp(1.18rem, 1.55vw, 1.42rem)',
          {
            lineHeight: '1.2',
          },
        ],
      },
      spacing: {
        section: 'clamp(4rem, 8vw, 7rem)',
        hero: 'clamp(5rem, 12vw, 8rem)',
      },
      boxShadow: {
        elegant: 'var(--shadow-elegant)',
        gold: '0 14px 36px rgb(var(--shadow-gold) / 0.18)',
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
