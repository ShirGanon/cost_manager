const mongoose = require('mongoose');

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

// uniqueness per (userid, year, month) recommended
reportSchema.index({ userid: 1, year: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Report', reportSchema, 'reports');
