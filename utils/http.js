// POST request with JSON and timeout
async function httpPostJson(url, body, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs || 1500);

  try {
    // Fetch with JSON body and signal
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    // Return success status from response
    return res.ok;
  } catch (e) {
    // Catch network errors or timeouts
    return false;
  } finally {
    // Clear timeout to prevent memory leaks
    clearTimeout(timeout);
  }
}

// Export networking utility
module.exports = {
  httpPostJson
};
