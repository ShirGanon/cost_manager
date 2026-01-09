const pino = require('pino');

const Log = require('../../../models/log.model');
const { createAppError } = require('../../../utils/error');

const logger = pino({
  // level: process.env.NODE_ENV === 'test' ? 'silent' : 'info'
  level: 'info'
});

async function ingestLog(req, res, next) {
  try {
    const { timestamp, method, path, status, service } = req.body;

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

    if (Number.isNaN(doc.timestamp.getTime())) {
      throw createAppError(11, 'Invalid timestamp', 400);
    }

    // Persist to MongoDB (logs collection)
    await Log.create(doc);

    // Console logging: allowed in runtime, silenced during tests
    logger.info(doc, 'http_request');

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  ingestLog
};
