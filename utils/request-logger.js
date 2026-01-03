const { sendLogToLogsService } = require('./logs-client');

function requestLogger(serviceName) {
  return function (req, res, next) {
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

      // Best-effort: לא מפיל את הבקשה אם logs-service לא זמין
      sendLogToLogsService(payload);
    });

    next();
  };
}

module.exports = {
  requestLogger
};
