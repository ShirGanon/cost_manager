'use strict';

const { httpPostJson } = require('./http');

function getLogsBaseUrl() {
  return process.env.LOGS_BASE_URL || 'http://localhost:3003';
}

async function sendLogToLogsService(logPayload) {
  const url = `${getLogsBaseUrl()}/internal/log`;
  return httpPostJson(url, logPayload, 1500);
}

module.exports = {
  sendLogToLogsService
};
