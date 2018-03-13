var CalendarHelper = require('../../../helpers/calendar.helper');

const getMeta = function(req, callback) {
	callback.onSuccess({ date: CalendarHelper.getUtcNow() });

	return;
};

module.exports = getMeta;
