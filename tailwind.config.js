/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'fintech-bg': '#0A0F1E',
        'fintech-blue': '#2563EB',
        'fintech-gold': '#F59E0B',
        'fintech-textPrimary': '#F3F4F6',
        'fintech-textSecondary': '#9CA3AF',
        'fintech-border': 'rgba(55, 65, 81, 0.5)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

