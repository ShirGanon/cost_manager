// Import HTTP client for POST requests
const { httpPostJson } = require('./http');

// Resolve logs-service URL with fallback
function getLogsBaseUrl() {
  return process.env.LOGS_BASE_URL || 'http://localhost:3003';
}

// Forward logs to ingestion with timeout
async function sendLogToLogsService(logPayload) {
  const url = `${getLogsBaseUrl()}/internal/log`;
  // Send log payload and return status
  return httpPostJson(url, logPayload, 1500);
}

// Export inter-service logging client
module.exports = {
  sendLogToLogsService
};
