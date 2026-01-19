require('dotenv').config({ quiet: true }); // Load environment variables
const mongoose = require('mongoose'); // Import Mongoose

// Import database connection utilities
const { connectMongo, disconnectMongo } = require('../db/mongo');
// Import test configuration utilities
const { getMode } = require('./test_config');

// Global setup: connect to our MongoDB
beforeAll(async () => {
  process.env.NODE_ENV = 'test';

  // connect to MongoDB before tests
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