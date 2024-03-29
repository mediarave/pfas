/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './wp-content/themes/aim/*.{html,js,php}',
        './wp-content/themes/aim/templates/*.php',
        './wp-content/themes/aim/mediarave/*.php',
        './wp-content/themes/aim/layouts/*.{html,js,php}'
    ],
    safelist: ['hidden'],
    theme: {
        extend: {
            colors: {
                teal: colors.teal
            },
            maxWidth: {
                xxs: '16rem'
            }
        }
    },
    plugins: [],

    corePlugins: {
        backgroundOpacity: false,
        textOpacity: false,
        preflight: false
    }
};
