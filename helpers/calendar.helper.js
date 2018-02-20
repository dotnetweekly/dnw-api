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
	let date = new Date(year, 0, 1);
  date.setHours(0,0,0,0);
  date.setDate(date.getDate() +(week * 7));

  let fromDate = new Date(date.setDate(date.getDate() - 7));
  fromDate.setHours(0,0,0,0);

  let toDate = new Date(date.setDate(date.getDate() + 6));
  toDate.setHours(0,0,0,0);

	const dateRange = {
		from: fromDate,
		to: toDate
  };
  return dateRange;
};

module.exports = { getWeek, getDateRangeOfWeek };
