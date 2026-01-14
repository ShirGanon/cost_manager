// Import the Mongoose library
const mongoose = require('mongoose');

let isConnected = false;

//Connects to MongoDB
async function connectMongo() {
  if (isConnected) {
    return;
  }

  // Validate and fetch connection string
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is missing in .env');
  }

  await mongoose.connect(uri);

  isConnected = true;
}

// Disconnect from MongoDB
async function disconnectMongo() {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
}

// Export connection utilities
module.exports = {
  connectMongo,
  disconnectMongo
};
