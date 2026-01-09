/*
 * COMPUTED DESIGN PATTERN:
 * - If the requested month is in the past: cache the computed report and reuse it.
 * - Costs cannot be added with past dates, so cached past reports remain valid.
 * - Reports are computed using the business date field: cost.date
 */

const Report = require('../../../models/report.model');
const Cost = require('../../../models/cost.model');
const { CATEGORIES } = require('../../../utils/constants');

function buildEmptyReport(userid, year, month) {
  return {
    userid,
    year,
    month,
    costs: CATEGORIES.map((c) => ({ [c]: [] }))
  };
}

function isPastMonth(year, month) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) {
    return true;
  }
  if (year > currentYear) {
    return false;
  }
  return month < currentMonth;
}

async function computeMonthlyReport(userid, year, month) {
  const report = buildEmptyReport(userid, year, month);

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  const items = await Cost.find(
    { userid, date: { $gte: start, $lt: end } },
    { _id: 0, description: 1, category: 1, sum: 1, date: 1 }
  ).lean();

  const grouped = new Map();
  CATEGORIES.forEach((c) => grouped.set(c, []));

  items.forEach((it) => {
    const day = new Date(it.date).getDate();
    const arr = grouped.get(it.category);
    if (arr) {
      arr.push({
        sum: it.sum,
        description: it.description,
        day
      });
    }
  });

  report.costs = CATEGORIES.map((c) => ({ [c]: grouped.get(c) || [] }));
  return report;
}

async function getOrComputeMonthlyReport(userid, year, month) {
  const shouldCache = isPastMonth(year, month);

  if (shouldCache) {
    const cached = await Report.findOne({ userid, year, month }, { _id: 0 }).lean();
    if (cached) {
      return {
        userid: cached.userid,
        year: cached.year,
        month: cached.month,
        costs: cached.costs
      };
    }
  }

  const report = await computeMonthlyReport(userid, year, month);

  if (shouldCache) {
    await Report.updateOne(
      { userid, year, month },
      { $setOnInsert: { userid, year, month, costs: report.costs, computedAt: new Date() } },
      { upsert: true }
    );
  }

  return report;
}

module.exports = {
  getOrComputeMonthlyReport
};
