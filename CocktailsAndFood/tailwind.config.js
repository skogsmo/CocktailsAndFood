/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            white: colors.white,
            black: colors.black,
            neutral: colors.neutral,
            yellow: {
                50: "#fefde8",
                100: "#fffbc2",
                200: "#fff489",
                300: "#ffe645",
                400: "#fcd20a",
                500: "#ecba06",
                600: "#cc9102",
                700: "#a26606",
                800: "#86500d",
                900: "#432205",
            },
            paleyellow: "#FFF8EB",
        },
        extend: {
            fontFamily: {
                ultra: ["Ultra"],
                montserrat: ["Montserrat"],
            },
        },
    },
    plugins: [],
};
