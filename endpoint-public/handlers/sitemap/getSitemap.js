const sm = require('sitemap');
const config = require("../../../config/");
var Link = require("../../../db/models/link.model");
var CalendarHelper = require("../../../helpers/calendar.helper");

const getSitemap = function(req, callback) {

  let weekSitemaps = [];
  let firstYear = 2012;
  let firstWeek = 20;

  const now = new Date(Date.now());
  const currentWeek = CalendarHelper.getWeek(now);
  const currentYear = now.getFullYear();
  while (firstYear < currentYear || (firstYear == currentYear && firstWeek <= currentWeek)) {
    if (!((firstYear == 2013 && firstWeek == 7) || 
    (firstYear == 2014 && firstWeek == 22) || 
    (firstYear == 2012 && firstWeek == 47) || 
    (firstYear == 2012 && firstWeek == 48))) {
      weekSitemaps.push(`${config.clientDomain}sitemap-${firstYear}-${firstWeek}.xml`);
    }
    firstWeek++;
    if (firstWeek > CalendarHelper.weeksInYear(firstYear)) {
      firstWeek = 1;
      firstYear++;
    }
  }

  // const totalLinks = linkUrls.concat(weekUrls)
  const totalSitemaps = weekSitemaps
    .concat(`${config.clientDomain}sitemap-weeks.xml`);

  const sitemaps = sm.buildSitemapIndex ({
    urls: totalSitemaps
  });

  callback.onSuccess("", "", "", sitemaps.toString());

  return;

};

module.exports = getSitemap;
