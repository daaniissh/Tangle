// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", "class"], // Enable dark mode with a 'dark' class
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Poppins font family
        ms: ["Microsoft Sans Serif", "sans-serif"], // Microsoft Sans Serif
        instagram: ["Poppins", "Helvetica", "Arial", "sans-serif"],
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      colors: {
        insta: {
          primary: "#405DE6",
          gradientStart: "#F58529",
          gradientMid: "#DD2A7B",
          gradientEnd: "#8134AF",
          link: "#0095F6",
          error: "#ED4956",
          background: "#FAFAFA",
          text: "#262626",
          border: "#DBDBDB",
          darkPrimary: "#8e8e8e",
          darkGradientStart: "#F58529",
          darkGradientMid: "#DD2A7B",
          darkGradientEnd: "#8134AF",
          darkLink: "#8AB4F8",
          darkError: "#F47174",
          darkBackground: "#121212",
          darkText: "#E4E6EB",
          darkBorder: "#3A3A3A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
