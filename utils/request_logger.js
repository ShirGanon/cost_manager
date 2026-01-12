const { sendLogToLogsService } = require('./logs_client');

function requestLogger(serviceName) {
  return function (req, res, next) {
    // Skip external logging during tests (faster + deterministic)
    if (process.env.NODE_ENV === 'test') {
      return next();
    }

    if (req.originalUrl.startsWith('/internal/log')) {
      return next();
    }

    const start = Date.now();

    res.on('finish', () => {
      const payload = {
        timestamp: new Date(),
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        service: serviceName,
        duration_ms: Date.now() - start
      };

      sendLogToLogsService(payload);
    });

    next();
  };
}

module.exports = {
  requestLogger
};
