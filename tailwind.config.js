/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                primary: {
                    DEFAULT: '#3387D1',
                    50: '#C9DFF3',
                    100: '#B8D5EF',
                    200: '#97C2E7',
                    300: '#76AEE0',
                    400: '#559BD8',
                    500: '#3387D1',
                    600: '#266AA6',
                    700: '#1B4D79',
                    800: '#11304B',
                    900: '#07131D'
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
