// Import the Mongoose library
const mongoose = require('mongoose');

// Cost schema definition
const costSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    category: { type: String, required: true },
    userid: { type: Number, required: true },

    // Cost amount and date
    sum: { type: Number, required: true },

    date: { type: Date, required: true },

    // Record creation timestamp
    createdAt: { type: Date, required: true }
  },
  { versionKey: false }
);

// Export Cost model
module.exports = mongoose.model('Cost', costSchema, 'costs');
