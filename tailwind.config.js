const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00f5d4", // Neon teal/turquoise
          light: "#4dffe8", // Lighter shade for hover effects
          dark: "#00c4a8", // Slightly darker shade for hover effects
        },
        background: {
          light: "#ffffff", // White
          dark: "#121212", // Very dark gray instead of pure black
        },
        text: {
          light: "#000000", // Black
          dark: "#ffffff", // White
        },
        gray: {
           100: "#f5f5f5",
           200: "#eeeeee",
           300: "#e0e0e0",
           400: "#bdbdbd",
           500: "#9e9e9e",
           600: "#757575",
           700: "#616161",
           800: "#424242",
           900: "#212121",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["DM Sans", "sans-serif"],
      },
      fontSize: {
        base: "1.125rem", // Slightly larger base font size
        lg: "1.25rem",
        xl: "1.375rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
