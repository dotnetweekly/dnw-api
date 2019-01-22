const sm = require("sitemap");
const config = require("../../../config/");
var Link = require("../../../db/models/link.model");
const weeklyCalendarHelper = require("weekly-calendar-helper");

const getSitemap = function(req, callback) {
  let weekSitemaps = [];
  let firstYear = 2012;
  let firstWeek = 20;

  const now = weeklyCalendarHelper.baseHelper.getUtcNow();
  const currentWeek = weeklyCalendarHelper.weekHelper.getWeekNumber(now);
  const currentYear = now.getFullYear();
  while (
    firstYear < currentYear ||
    (firstYear == currentYear && firstWeek <= currentWeek)
  ) {
    if (
      !(
        (firstYear == 2013 && firstWeek == 7) ||
        (firstYear == 2014 && firstWeek == 22) ||
        (firstYear == 2012 && firstWeek == 47) ||
        (firstYear == 2012 && firstWeek == 48)
      )
    ) {
      weekSitemaps.push(
        `${config.clientDomain}sitemap-${firstYear}-${firstWeek}.xml`
      );
    }
    firstWeek++;
    if (firstWeek > weeklyCalendarHelper.weekHelper.weeksInYear(firstYear)) {
      firstWeek = 1;
      firstYear++;
    }
  }

  // const totalLinks = linkUrls.concat(weekUrls)
  const totalSitemaps = weekSitemaps.concat(
    `${config.clientDomain}sitemap-weeks.xml`
  );

  const sitemaps = sm.buildSitemapIndex({
    urls: totalSitemaps
  });

  callback.onSuccess("", "", "", sitemaps.toString());

  return;
};

module.exports = getSitemap;
