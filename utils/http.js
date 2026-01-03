async function httpPostJson(url, body, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs || 1500);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    return res.ok;
  } catch (e) {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = {
  httpPostJson
};
