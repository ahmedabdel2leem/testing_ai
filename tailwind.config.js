/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "96rem",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          100: "#DEC8FE", // Lightest shade
          200: "#9B84EE", // Default shade
          300: "#704FE6", // Darkest shade
        },
        secondary: {
          100: "#FFD25D",
          200: "#FFBE17",
          300: "#FFB802",
        },
        backgroundGray: "#636363",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', "sans-serif"], // Set global font family
      },
      fontSize: {
        // Define only the font sizes and line heights
        "display-2xl": ["72px", { lineHeight: "90px" }],
        "display-xl": ["60px", { lineHeight: "72px" }],
        "display-lg": ["48px", { lineHeight: "60px" }],
        "display-md": ["36px", { lineHeight: "44px" }],
        "display-sm": ["30px", { lineHeight: "38px" }],
        "display-xs": ["24px", { lineHeight: "32px" }],
        "text-xl": ["20px", { lineHeight: "30px" }],
        "text-lg": ["18px", { lineHeight: "28px" }],
        "text-md": ["16px", { lineHeight: "24px" }],
        "text-sm": ["14px", { lineHeight: "20px" }],
        "text-xs": ["12px", { lineHeight: "18px" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
    container: {
      padding: "1rem",
    },
  },
  plugins: [],
};
