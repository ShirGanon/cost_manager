/**
 * Parse a value into a finite number.
 * Returns null if the value cannot be parsed into a valid number.
 */
function parseNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * Check if a value is a finite number.
 */
function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Validate that a value is a non-empty string.
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validate that a value is a valid Date (or date-like input).
 */
function parseDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Validate category against allowed categories.
 */
function validateCategory(category, allowedCategories) {
  return (
    typeof category === 'string' &&
    Array.isArray(allowedCategories) &&
    allowedCategories.includes(category)
  );
}

/**
 * Validate month (1–12).
 */
function validateMonth(month) {
  const m = parseNumber(month);
  return m !== null && Number.isInteger(m) && m >= 1 && m <= 12;
}

/**
 * Validate year (reasonable range).
 */
function validateYear(year) {
  const y = parseNumber(year);
  return y !== null && Number.isInteger(y) && y >= 1970 && y <= 3000;
}

/**
 * Ensure that a given date is not in the past (date-level, not time-level).
 */
function isNotPastDate(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const given = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return given >= today;
}

module.exports = {
  parseNumber,
  isFiniteNumber,
  isNonEmptyString,
  parseDate,
  validateCategory,
  validateMonth,
  validateYear,
  isNotPastDate
};
