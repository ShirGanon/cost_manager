// Import the Mongoose library
const mongoose = require('mongoose');

// Monthly report schema
const reportSchema = new mongoose.Schema(
  {
    userid: { type: Number, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    costs: { type: Array, required: true },
    computedAt: { type: Date, required: true }
  },
  { versionKey: false }
);

// Prevent duplicate reports
reportSchema.index({ userid: 1, year: 1, month: 1 }, { unique: true });

// Export Report model
module.exports = mongoose.model('Report', reportSchema, 'reports');
