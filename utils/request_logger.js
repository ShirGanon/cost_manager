// Import inter-service logging client
const { sendLogToLogsService } = require('./logs_client');

// Middleware to log request metadata
function requestLogger(serviceName) {
  return function (req, res, next) {
    // Skip external logging during tests (faster + deterministic)
    if (process.env.NODE_ENV === 'test') {
      return next();
    }

    // Prevent recursive logging loops
    if (req.originalUrl.startsWith('/internal/log')) {
      return next();
    }

    const start = Date.now();

    // Log on response 'finish' event
    res.on('finish', () => {
      const payload = {
        timestamp: new Date(),
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        service: serviceName,
        duration_ms: Date.now() - start
      };

      // Asynchronously dispatch log payload
      sendLogToLogsService(payload);
    });

    next();
  };
}

// Export request logger middleware
module.exports = {
  requestLogger
};
