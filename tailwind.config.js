module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        "spring-1": `var(--ease-spring-1)`,
        "spring-2": `var(--ease-spring-2)`,
        "spring-3": `var(--ease-spring-3)`,
        "spring-4": `var(--ease-spring-4)`,
        "spring-5": `var(--ease-spring-5)`,
        "elastic-in-out-1": `var(--ease-elastic-in-out-1)`,
        "elastic-in-out-2": `var(--ease-elastic-in-out-2)`,
        "elastic-in-out-3": `var(--ease-elastic-in-out-3)`,
        "elastic-in-out-4": `var(--ease-elastic-in-out-4)`,
        "elastic-in-out-5": `var(--ease-elastic-in-out-5)`,
      },
    },
  },
  plugins: [],
};
