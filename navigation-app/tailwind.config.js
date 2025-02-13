/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "work-black": ["WorkSans-Black", "sans-serif"],
        "work-light": ["WorkSans-Light", "sans-serif"],
        "work-medium": ["WorkSans-Medium", "sans-serif"],
      },
    },

    colors: {
      primary: "#49129c",
      secondary: {
        DEFAULT: "#B40086",
        100: "#C51297",
        200: "#831266",
      },
      tertiary: "#EF2967",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
