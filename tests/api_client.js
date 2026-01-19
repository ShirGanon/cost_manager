// Centralized HTTP client for integration tests.
const request = require('supertest');
const { getBaseUrls } = require('./test_config');

// Return a Supertest client bound to a base URL (string).
// This forces tests to go through the real HTTP stack (Express -> middleware -> routing).
function client(serviceName) {
  const base = getBaseUrls()[serviceName];
  if (!base) {
    throw new Error(`Unknown service name: ${serviceName}`);
  }
  return request(base);
}

module.exports = {
  client
};
