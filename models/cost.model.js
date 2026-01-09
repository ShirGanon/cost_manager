const mongoose = require('mongoose');

const costSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    category: { type: String, required: true },
    userid: { type: Number, required: true },

    // Mongo stores "double", JS uses Number
    sum: { type: Number, required: true },

    // Business date for the cost (can be future, cannot be past)
    date: { type: Date, required: true },

    // System timestamp (when inserted)
    createdAt: { type: Date, required: true }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Cost', costSchema, 'costs');
