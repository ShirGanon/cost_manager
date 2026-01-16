// Jest configuration for the Node.js environment
module.exports = {
  testEnvironment: 'node',
  // Link to global test setup
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js']
};
