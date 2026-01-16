// Import the Mongoose library
const mongoose = require('mongoose');

// System logs schema
const logSchema = new mongoose.Schema(
  {
    timestamp: { type: Date, required: true },
    method: { type: String, required: true },
    path: { type: String, required: true },
    status: { type: Number, required: true },
    service: { type: String, required: true }
  },
  { versionKey: false }
);

// Export Log model
module.exports = mongoose.model('Log', logSchema, 'logs');
