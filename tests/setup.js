// Load environment variables
require('dotenv').config({ quiet: true });

// Import Mongoose
const mongoose = require('mongoose');

// Import database connection utilities
const { connectMongo, disconnectMongo } = require('../db/mongo');

// Global setup: connect to real MongoDB
beforeAll(async () => {
  process.env.NODE_ENV = 'test';

  // Modify MONGO_URI to use /test database for testing
  let uri = process.env.MONGO_URI;
  if (!uri.includes('/test')) {
    const parts = uri.split('?');
    process.env.MONGO_URI = parts[0].replace(/\/[^\/]*$/, '/test') + '?' + (parts[1] || '');
  }

  await connectMongo();
});

// Pre-test hook: clear all collections
beforeEach(async () => {
  // Ensure test data isolation
  const collections = await mongoose.connection.db.collections();
  const deletions = collections.map((c) => c.deleteMany({}));
  // Concurrently delete all collections
  await Promise.all(deletions);
});

// Global teardown: clear data and close DB
afterAll(async () => {
  // Clean up any remaining test data
  if (mongoose.connection.readyState === 1) {
    const collections = await mongoose.connection.db.collections();
    const deletions = collections.map((c) => c.deleteMany({}));
    await Promise.all(deletions);
  }

  await disconnectMongo();
});
