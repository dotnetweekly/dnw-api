const getWeek = function(dateValue) {
	const target = new Date(dateValue);
	const dayNr = (target.getDay() + 6) % 7;
	target.setDate(target.getDate() - dayNr + 3);
	const firstThursday = target.valueOf();
	target.setMonth(0, 1);
	if (target.getDay() != 4) {
		target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
	}
	return 1 + Math.ceil((firstThursday - target) / 604800000);
};

const getUtcNow = function() {
	const now = new Date(Date.now());
	return new Date(
		now.getUTCFullYear(),
		now.getUTCMonth(),
		now.getUTCDate(),
		now.getUTCHours(),
		now.getUTCMinutes(),
		now.getUTCSeconds(),
		now.getUTCMilliseconds()
	);
};

function getWeekNumber(d) {
	// Copy date so don't modify original
	d = new Date(+d);
	d.setHours(0, 0, 0);
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setDate(d.getDate() + 4 - (d.getDay() || 7));
	// Get first day of year
	var yearStart = new Date(d.getFullYear(), 0, 1);
	// Calculate full weeks to nearest Thursday
	var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	// Return array of year and week number
	return [d.getFullYear(), weekNo];
}

const weeksInYear = function(year) {
	var d = new Date(year, 11, 31);
	var week = getWeekNumber(d)[1];
	return week == 1 ? getWeekNumber(d.setDate(24))[1] : week;
};

const getDateRangeOfWeek = function(week, year) {
	let date = new Date(year, 0, 1);
	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() + week * 7);

	let fromDate = new Date(date.setDate(date.getDate() - 7));
	fromDate.setHours(0, 0, 0, 0);

	let toDate = new Date(date.setDate(date.getDate() + 6));
	toDate.setHours(0, 0, 0, 0);

	const dateRange = {
		from: fromDate,
		to: toDate
	};
	return dateRange;
};

module.exports = { getWeek, getDateRangeOfWeek, weeksInYear, getUtcNow };
