const weeklyCalendarHelper = require("weekly-calendar-helper");

const getMeta = function(req, callback) {
  callback.onSuccess({ date: weeklyCalendarHelper.baseHelper.getUtcNow() });

  return;
};

module.exports = getMeta;
