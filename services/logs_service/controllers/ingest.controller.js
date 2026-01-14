// Import Pino logger and Log model
const pino = require('pino');

const Log = require('../../../models/log.model');
const { createAppError } = require('../../../utils/error');

// Initialize logger at info level
const logger = pino({
  // level: process.env.NODE_ENV === 'test' ? 'silent' : 'info'
  level: 'info'
});

// Process, validate, and save logs
async function ingestLog(req, res, next) {
  try {
    const { timestamp, method, path, status, service } = req.body;

    // Validate log payload fields
    if (!timestamp || !method || !path || typeof status !== 'number' || !service) {
      throw createAppError(10, 'Invalid log payload', 400);
    }

    const doc = {
      timestamp: new Date(timestamp),
      method: String(method),
      path: String(path),
      status: Number(status),
      service: String(service)
    };

    // Validate log timestamp
    if (Number.isNaN(doc.timestamp.getTime())) {
      throw createAppError(11, 'Invalid timestamp', 400);
    }

    await Log.create(doc);

    // Log to console and return response
    logger.info(doc, 'http_request');

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

// Export log handler
module.exports = {
  ingestLog
};
