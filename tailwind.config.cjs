/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        fontFamily: {
            primary: 'Nunito, sans-serif',
            secondary: 'League Spartan, sans-serif',
            tertiary: 'Spectral, san-serif',
            title: 'Dancing Script, san-serif',
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};

module.exports = config;
