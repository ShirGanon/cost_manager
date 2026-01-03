/*
 * COMPUTED DESIGN PATTERN:
 * - If the requested month is in the past: cache the computed report in MongoDB and reuse it.
 * - If the requested month is current/future: compute on demand (do not cache).
 * - Costs cannot be added with past dates, so cached past reports remain valid.
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
    { userid, createdAt: { $gte: start, $lt: end } },
    { _id: 0, description: 1, category: 1, sum: 1, createdAt: 1 }
  ).lean();

  const map = new Map();
  CATEGORIES.forEach((c) => map.set(c, []));

  items.forEach((it) => {
    const day = new Date(it.createdAt).getDate();
    const list = map.get(it.category);
    if (list) {
      list.push({
        sum: it.sum,
        description: it.description,
        day
      });
    }
  });

  report.costs = CATEGORIES.map((c) => ({ [c]: map.get(c) || [] }));
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
    // Best practice: avoid duplicate key crash if two requests race
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
