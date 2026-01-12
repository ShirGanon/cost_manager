const { createAppError } = require('../../../utils/error');
const { parseNumber, validateMonth, validateYear } = require('../../../utils/validate');
const reportService = require('../services/report.service');

async function getMonthlyReport(req, res, next) {
  try {
    const id = parseNumber(req.query.id);
    const year = parseNumber(req.query.year);
    const month = parseNumber(req.query.month);

    if (id === null || !Number.isInteger(id)) {
      throw createAppError(201, 'Invalid id', 400);
    }
    if (!validateYear(year)) {
      throw createAppError(202, 'Invalid year', 400);
    }
    if (!validateMonth(month)) {
      throw createAppError(203, 'Invalid month', 400);
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
