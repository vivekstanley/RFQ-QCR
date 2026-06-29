/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@ahmed.tawfik.galal/design-system/dist/config/tailwind-preset'),
  ],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@ahmed.tawfik.galal/design-system/dist/**/*.js',
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.06)',
        elevated: '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
    },
  },
}
