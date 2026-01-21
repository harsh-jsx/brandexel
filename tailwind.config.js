// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        albra: ["Albra", "sans-serif"],
        abc: ["ABC", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};
