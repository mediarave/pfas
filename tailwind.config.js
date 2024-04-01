/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./public/*.html'],
    safelist: ['hidden'],
    theme: {
        extend: {
            colors: {
                cyan: colors.cyan,
            },
            maxWidth: {
                xxs: '16rem',
            },
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],

    corePlugins: {
        backgroundOpacity: false,
        textOpacity: false,
        preflight: false,
    },
};
