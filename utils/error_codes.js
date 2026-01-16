/*
  Convention:
  1000-1099: Validation / Input
  1100-1199: Users
  1200-1299: Costs/Reports
  1300-1399: Logs
  1400-1499: Admin
  2000-2099: Database (Mongo/Mongoose)
  5000-5999: Internal / Unknown
*/
const ERROR_CODES = Object.freeze({
  // Validation / Input
  INVALID_ID: 1000,
  VALIDATION_FAILED: 1001,
  INVALID_JSON_BODY: 1002,
  INVALID_FIRST_NAME_LAST_NAME: 1003,
  INVALID_BIRTHDAY: 1004,
  INVALID_DESCRIPTION: 1005,
  INVALID_CATEGORY: 1006,
  INVALID_USERID: 1007,
  INVALID_SUM: 1008,
  INVALID_DATE: 1009,
  INVALID_YEAR: 1010,
  INVALID_MONTH: 1011,
  INVALID_TIMESTAMP: 1012,

  // Users
  USER_NOT_FOUND: 1100,

  // Costs / Reports
  COST_DATE_IN_PAST: 1200,
  REPORT_INVALID_QUERY: 1201,

  // Logs
  LOG_INVALID_PAYLOAD: 1300,

  // Database (ALL Mongo errors)
  DB_ERROR: 2000,

  // Internal / Unknown
  UNKNOWN_ERROR: 5000
});

module.exports = {
  ERROR_CODES
};
