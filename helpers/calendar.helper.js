const isISO = function(dateValue) {
	const date = new Date(dateValue);
	let checkDate = date.setDate(date.getDate() - date.getDay());
	checkDate = new Date(checkDate);
	return checkDate.getDay();
};

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

const getDateRangeOfWeek = function(week, year) {
	var date = new Date(year, 0, 1);
	date.setDate(date.getDate() + week * 7);
	return {
		from: new Date(date.setDate(date.getDate() - 6)),
		to: new Date(date.setDate(date.getDate() + 6))
	};
};

module.exports = { getWeek, getDateRangeOfWeek };
