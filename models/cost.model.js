const mongoose = require('mongoose');

const costSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    category: { type: String, required: true },
    userid: { type: Number, required: true },
    sum: { type: Number, required: true }, // MongoDB Double represented as Number in JS
    createdAt: { type: Date, required: true }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Cost', costSchema, 'costs');
