const mongoose = require('mongoose');

let isConnected = false;

/**
 * Connect to MongoDB using Mongoose (shared by all services).
 */
async function connectMongo() {
  if (isConnected) {
    return;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is missing in .env');
  }

  await mongoose.connect(uri);

  isConnected = true;
}

/**
 * Optional disconnect (useful for tests).
 */
async function disconnectMongo() {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
}

module.exports = {
  connectMongo,
  disconnectMongo
};
