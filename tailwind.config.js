/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./*.{html,js}'],
    safelist: ['hidden'],
    theme: {
        extend: {
            colors: {
                teal: colors.teal,
            },
            maxWidth: {
                xxs: '16rem',
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
