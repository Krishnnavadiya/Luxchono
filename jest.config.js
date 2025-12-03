// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    "/node_modules/(?!(query-string)/)"  // <-- transform query-string
  ],
};
