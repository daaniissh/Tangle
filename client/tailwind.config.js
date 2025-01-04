// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector", // Enable dark mode with a 'dark' class
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        ms: ["Microsoft Sans Serif", "sans-serif"],
        instagram: ["Poppins", "Helvetica", "Arial", "sans-serif"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        blink: "blink 3s infinite",
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
          darkBackground: "#000",
          darkText: "#E4E6EB",
          darkBorder: "#3A3A3A",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
  ],
};
