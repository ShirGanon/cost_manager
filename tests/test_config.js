// Central test configuration.
// Supports two modes:
// 1) TEST_MODE=local  -> tests call 4 locally-running Express services (User should run them).
// 2) TEST_MODE=render -> tests call 4 remote URLs (Render deployment).

// Determine test mode from env var (default: local)
function getMode() {
  return (process.env.TEST_MODE || 'local').toLowerCase();
}
// Ensure required env var is set, else throw.
function required(name) {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v;
}

// Normalize base URL by stripping trailing slashes.
function normalizeBaseUrl(url) {
  return url.replace(/\/+$/, '');
}

function getBaseUrls() {
  const mode = getMode();

  // Defaults for local mode (can be overridden via env)
  const defaults = {
    logs: `http://localhost:${process.env.PORT_LOGS || 3003}`,
    users: `http://localhost:${process.env.PORT_USERS || 3001}`,
    costs: `http://localhost:${process.env.PORT_COSTS || 3002}`,
    admin: `http://localhost:${process.env.PORT_ADMIN || 3004}`
  };

  if (mode === 'local') {
    return Object.fromEntries(Object.entries(defaults).map(([k, v]) => [k, normalizeBaseUrl(v)]));
  }

  // Remote mode: Render deployment URLs.
  return {
    logs: normalizeBaseUrl(required('TEST_URL_LOGS')),
    users: normalizeBaseUrl(required('TEST_URL_USERS')),
    costs: normalizeBaseUrl(required('TEST_URL_COSTS')),
    admin: normalizeBaseUrl(required('TEST_URL_ADMIN'))
  };
}

module.exports = {
  getMode,
  getBaseUrls
};
