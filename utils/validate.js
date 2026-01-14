// Convert to finite number or null
function parseNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

// Validate non-empty string
function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

// Parse to valid Date or null
function parseDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Check if date is today or future
function isNotPastDate(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const given = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return given >= today;
}

// Validate month (1-12)
function validateMonth(month) {
  const m = parseNumber(month);
  return m !== null && Number.isInteger(m) && m >= 1 && m <= 12;
}

// Validate year (1970-3000)
function validateYear(year) {
  const y = parseNumber(year);
  return y !== null && Number.isInteger(y) && y >= 1970 && y <= 3000;
}

// Validate category against permitted values
function validateCategory(category, allowedCategories) {
  return (
    typeof category === 'string' &&
    Array.isArray(allowedCategories) &&
    allowedCategories.includes(category)
  );
}

// Export validation and sanitization suite
module.exports = {
  parseNumber,
  isNonEmptyString,
  parseDate,
  isNotPastDate,
  validateMonth,
  validateYear,
  validateCategory
};
