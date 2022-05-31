process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = "";
process.env.TZ = "Pacific/Guadalcanal"; // set to fixed timezone so tests can be run consistently
process.on("unhandledRejection", (err) => {
  throw err;
});

module.exports = {
  modulePaths: ["src"],
  modulePathIgnorePatterns: ["<rootDir>/dist", "<rootDir>/lib"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: [
    `<rootDir>/src/**/__tests__/**/*(spec|test).{js,jsx,mjs,tsx,ts}`,
    `<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs,tsx,ts}`,
  ],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.[t|j]sx?$": ["babel-jest", { rootMode: "upward" }],
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"],
};