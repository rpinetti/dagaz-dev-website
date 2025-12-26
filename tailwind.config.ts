/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Habilita o modo escuro baseado na classe 'dark' no HTML
  theme: {
    extend: {
      colors: {
        'fjord-blue': {
          DEFAULT: '#0A2E5C', // Azul Fiorde
          light: '#1A4A8C',
          dark: '#051A3D',
        },
        'viking-gold': {
          DEFAULT: '#D4AF37', // Dourado Viking
          light: '#E8C856',
          dark: '#A68A2A',
        },
        'glacial-cyan': {
          DEFAULT: '#00D9FF', // Ciano Glacial
          light: '#4DFFFF',
          dark: '#00A8CC',
        },
        'runic-white': '#FFFFFF', // Branco Rúnico
        'forge-gray': {
          DEFAULT: '#1A1A1A', // Cinza da Forja
          light: '#333333',
          dark: '#0D0D0D',
        },
        success: '#10B981', // Verde
        warning: '#F59E0B', // Laranja
        error: '#EF4444', // Vermelho
        info: '#3B82F6', // Azul
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
        lato: ['var(--font-lato)', ...fontFamily.sans],
        mono: ['var(--font-roboto-mono)', ...fontFamily.mono],
      },
      boxShadow: {
        cyan: '0 0 20px rgba(0, 217, 255, 0.2)',
        gold: '0 0 20px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};