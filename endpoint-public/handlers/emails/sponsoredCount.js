const sanitize = require('mongo-sanitize');
const Feed = require('feed');

var Link = require('../../../db/models/link.model');
var categories = require('../../../data/categories');
const CalendarHelper = require('../../../helpers/calendar.helper');
const config = require('../../../config/');

const getSponsoredCount = async function(dateRange) {
  const searchParams = {};
  searchParams.createdOn = { $gte: dateRange.from, $lte: dateRange.to };
  searchParams.category = { $in: ["sponsored", "job-listing"] };

  const query = Link.find(searchParams);

  return new Promise((resolve, reject) => {
    query.exec(function(err, data) {
      resolve({
        sponsoredCount: data.filter( x => x.category === "sponsored" && x.isActive && x.isPayed ).length,
        jobListingCount: data.filter( x => x.category === "job-listing" && x.isActive && x.isPayed ).length
      })
    });
  });
}

const sponsoredCount = async function(req, callback) {
  const now = CalendarHelper.getUtcNow();
	let week = req.query ? sanitize(req.query.week) : null;
  let year = req.query ? sanitize(req.query.year) : null;

	if (!week || !year) {
		week = parseInt(CalendarHelper.getWeek(now));
		year = parseInt(now.getFullYear());
  }
  const weeksCount = CalendarHelper.weeksInYear(year);
  const nextWeeks = [];

  let returnData = {
    serverWeek: CalendarHelper.getWeek(now),
    serverYear: now.getFullYear(),
    serverMonth: now.getMonth(),
    serverDate: now.getDate(),
    nextWeeks
  };

  for(var i = 1; i < 6; i++) {
    let nextWeek = parseInt(week) + i - 1;
    let nextYear = parseInt(year);
    if (nextWeek > weeksCount) {
      nextWeek = nextWeek - weeksCount;
      nextYear = parseInt(year) + 1;
    }

    const dateRange = CalendarHelper.getDateRangeOfWeek(parseInt(nextWeek), parseInt(nextYear));
    const sponsorCount = await getSponsoredCount(dateRange);

    console.log(dateRange, sponsorCount);

    returnData.nextWeeks.push({
      week: nextWeek,
      year: nextYear,
      sponsoredCount: sponsorCount.sponsoredCount,
      jobListingCount: sponsorCount.jobListingCount,
      tuesday: (new Date(dateRange.from)).addDays(1)
    });
  }

  callback.onSuccess(returnData);
  
}

module.exports = sponsoredCount;
