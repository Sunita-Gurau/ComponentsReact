/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border|hover:bg|hover:text|active:bg|active:text|disabled:bg|disabled:text|disabled:border)-(blue|red|green|yellow)-(50|100|200|300|500|600|700)/,
      variants: ['hover', 'active', 'disabled'],
    },
    // Explicitly add hover:text-{color}-500 and active:bg-{color}-50 for all colors
    {
      pattern: /(hover:text|active:bg)-(blue|red|green|yellow)-500/,
    },
    {
      pattern: /active:bg-(blue|red|green|yellow)-50/,
    },
  ],
}; 