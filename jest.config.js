module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['scripts/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/assets/'],
  testMatch: ['**/tests/**/*.test.js'],
};

