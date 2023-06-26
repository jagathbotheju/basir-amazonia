/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: { ...colors.violet, DEFAULT: colors.violet[600] },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    plugin(({ theme, addUtilities }) => {
      const neonUtilities = {};
      const colors = theme("colors");
      for (const color in colors) {
        if (typeof colors[color] === "object") {
          const color1 = colors[color]["500"];
          const color2 = colors[color]["700"];
          neonUtilities[`.neon-${color}`] = {
            boxShadow: `0 0 5px ${color1},0 0 20px ${color2}`,
          };
        }
      }
      addUtilities(neonUtilities);
    }),
  ],
};
