// Import Pino logger and Log model
const pino = require('pino');

const Log = require('../../../models/log.model');
const { createAppError } = require('../../../utils/error');
const { ERROR_CODES } = require('../../../utils/error_codes');

// Initialize logger at info level
const logger = pino({
  level: 'info'
});

// Process, validate, and save logs
async function ingestLog(req, res, next) {
  try {
    const { timestamp, method, path, status, service } = req.body;

    // Validate log payload fields
    if (!timestamp || !method || !path || typeof status !== 'number' || !service) {
      throw createAppError(ERROR_CODES.LOG_INVALID_PAYLOAD, 'Invalid log payload', 400);
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
      throw createAppError(ERROR_CODES.INVALID_TIMESTAMP, 'Invalid timestamp', 400);
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
