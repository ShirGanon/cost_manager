function parseNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function parseDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Compare dates at day granularity (ignoring time).
 * Returns true if date >= today.
 */
function isNotPastDate(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const given = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return given >= today;
}

function validateMonth(month) {
  const m = parseNumber(month);
  return m !== null && Number.isInteger(m) && m >= 1 && m <= 12;
}

function validateYear(year) {
  const y = parseNumber(year);
  return y !== null && Number.isInteger(y) && y >= 1970 && y <= 3000;
}

function validateCategory(category, allowedCategories) {
  return (
    typeof category === 'string' &&
    Array.isArray(allowedCategories) &&
    allowedCategories.includes(category)
  );
}

module.exports = {
  parseNumber,
  isNonEmptyString,
  parseDate,
  isNotPastDate,
  validateMonth,
  validateYear,
  validateCategory
};
