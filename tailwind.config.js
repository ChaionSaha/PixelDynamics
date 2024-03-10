/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:
                {
                    'base-100': '#fff',
                    'base-200': '#ccc',
                    'base-300': '#666',
                    'theme-black': '#0D0B0D'
                }
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
