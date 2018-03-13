const sm = require('sitemap');
const config = require('../../../config/');
var Link = require('../../../db/models/link.model');
var CalendarHelper = require('../../../helpers/calendar.helper');

const getSitemapWeeks = function(req, callback) {
	let weekUrls = [];
	let firstYear = 2012;
	let firstWeek = 20;

	const now = CalendarHelper.getUtcNow();
	const currentWeek = CalendarHelper.getWeek(now);
	const currentYear = now.getFullYear();
	while (firstYear < currentYear || (firstYear == currentYear && firstWeek <= currentWeek)) {
		weekUrls.push(`/week/${firstWeek}/year/${firstYear}`);
		firstWeek++;
		if (firstWeek > CalendarHelper.weeksInYear(firstYear)) {
			firstWeek = 1;
			firstYear++;
		}
	}

	// const totalLinks = linkUrls.concat(weekUrls)
	const totalLinks = weekUrls.concat(`/about`).concat(`/newsletters`);

	const sitemap = sm.createSitemap({
		hostname: config.clientDomain,
		cacheTime: 600000,
		urls: totalLinks
	});

	callback.onSuccess('', '', '', sitemap.toString());

	return;
};

module.exports = getSitemapWeeks;
