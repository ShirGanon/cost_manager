const { createAppError } = require('../../../utils/error');
const { ERROR_CODES } = require('../../../utils/error_codes');
const { parseNumber, validateMonth, validateYear } = require('../../../utils/validate');
const reportService = require('../services/report.service');

async function getMonthlyReport(req, res, next) {
  try {
    const id = parseNumber(req.query.id);
    const year = parseNumber(req.query.year);
    const month = parseNumber(req.query.month);

    if (id === null || !Number.isInteger(id)) {
      throw createAppError(ERROR_CODES.INVALID_ID, 'Invalid id', 400);
    }
    if (!validateYear(year)) {
      throw createAppError(ERROR_CODES.INVALID_YEAR, 'Invalid year', 400);
    }
    if (!validateMonth(month)) {
      throw createAppError(ERROR_CODES.INVALID_MONTH, 'Invalid month', 400);
    }

    const report = await reportService.getOrComputeMonthlyReport(id, year, month);
    res.json(report);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMonthlyReport
};
