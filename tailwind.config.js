/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'laptop': {'raw': '(-webkit-min-device-pixel-ratio: 1.25) and (min-width: 1024px)'},
            },
            colors:
                {
                    'base-100': '#fff',
                    'base-200': '#ccc',
                    'base-300': '#666',
                    'theme-black': '#0D0B0D',
                    'secondary': '#f5f5f5',
                    'admin-primary': '#161B21',
                    'admin-secondary': '#1D232C',
                }
        },
        listStyleType: {
            none: 'none',
            disc: 'disc',
            decimal: 'decimal',
            square: 'square',
            roman: 'upper-roman',
        },
        fontSize: {
            'xs': '.75rem',
            'sm': '.875rem',
            'tiny': '.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
    },

    darkMode: "class",
    plugins: [nextui(), require("daisyui")],

    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#000",
                    'secondary': '#f5f5f5'
                },
            },

        ],
    },
};
