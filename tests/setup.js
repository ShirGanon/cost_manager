const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { connectMongo, disconnectMongo } = require('../db/mongo');

let mongoServer = null;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';

  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();

  await connectMongo();
});

beforeEach(async () => {
  // Clean DB between tests so each test is independent
  const collections = await mongoose.connection.db.collections();
  const deletions = collections.map((c) => c.deleteMany({}));
  await Promise.all(deletions);
});

afterAll(async () => {
  await disconnectMongo();

  if (mongoServer) {
    await mongoServer.stop();
  }
});
