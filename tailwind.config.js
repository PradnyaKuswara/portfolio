const svgToDataUri = require("mini-svg-data-uri");
 
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            animation: {
                marquee: 'marquee var(--duration) linear infinite',
                'marquee-vertical':
                    'marquee-vertical var(--duration) linear infinite',
                meteor: 'meteor 5s linear infinite',
            },
            keyframes: {
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(calc(-100% - var(--gap)))' },
                },
                'marquee-vertical': {
                    from: { transform: 'translateY(0)' },
                    to: { transform: 'translateY(calc(-100% - var(--gap)))' },
                },
                meteor: {
                    '0%': {
                        transform: 'rotate(215deg) translateX(0)',
                        opacity: 1,
                    },
                    '70%': { opacity: 1 },
                    '100%': {
                        transform: 'rotate(215deg) translateX(-500px)',
                        opacity: 0,
                    },
                },
            },
        },
    },
    darkMode: ['class', '[data-theme="dark"]'], // or 'media' or 'class'
    daisyui: {
        themes: [
            {
                light: {
                    'color-scheme': 'light',
                    primary: 'oklch(56.86% 0.255 257.57)',
                    secondary: '#463AA2',
                    accent: '#C148AC',
                    neutral: '#021431',
                    'base-100': 'oklch(100% 0 0)',
                    'base-200': '#F2F7FF',
                    'base-300': '#E3E9F4',
                    'base-content': '#394E6A',
                    info: '#93E7FB',
                    success: '#81CFD1',
                    warning: '#EFD7BB',
                    error: '#E58B8B',
                },
                dark: {
                    'color-scheme': 'dark',
                    primary: '#38bdf8',
                    secondary: '#818CF8',
                    accent: '#F471B5',
                    neutral: '#1E293B',
                    'base-100': '#030712',
                    info: '#0CA5E9',
                    'info-content': '#000000',
                    success: '#2DD4BF',
                    warning: '#F4BF50',
                    error: '#FB7085',
                },
            },
        ],
    },
    plugins: [require('daisyui'), function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            "bg-grid": (value) => ({
              backgroundImage: `url("${svgToDataUri(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
              )}")`,
            }),
            "bg-grid-small": (value) => ({
              backgroundImage: `url("${svgToDataUri(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
              )}")`,
            }),
            "bg-dot": (value) => ({
              backgroundImage: `url("${svgToDataUri(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
              )}")`,
            }),
          },
          { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
        );
      },],
};
