const mongoose = require('mongoose');

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

module.exports = mongoose.model('Log', logSchema, 'logs');
