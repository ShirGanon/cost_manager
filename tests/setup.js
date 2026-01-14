// Import Mongoose and MongoMemoryServer
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Import database connection utilities
const { connectMongo, disconnectMongo } = require('../db/mongo');

let mongoServer = null;

// Global setup: initialize in-memory DB
beforeAll(async () => {
  process.env.NODE_ENV = 'test';

  // Start memory server and set URI
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();

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

// Global teardown: close DB and server
afterAll(async () => {
  await disconnectMongo();

  if (mongoServer) {
    await mongoServer.stop();
  }
});
