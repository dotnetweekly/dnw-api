const sm = require('sitemap');
const config = require("../../../config/");
var Link = require("../../../db/models/link.model");
var CalendarHelper = require("../../../helpers/calendar.helper");

const getSitemap = function(req, callback) {

  var query = Link.find({}, [
    "title",
    "createdOn",
    "slug",
    "category",
    "tags"
  ]);
  
  query
    .populate("user", "username")
    .sort({ createdOn: -1 });

  query.exec(function(err, data) {

    let linkUrls = [];
    for (var i = 0; i < data.length; i++) {
      let linkUrl = `/${data[i].category}/${data[i].slug}`;
      linkUrl = linkUrl.replace(/\/$/, "");
      linkUrls.push({ url: linkUrl });
    }

    for (var i = 0; i < data.length; i++) {
      let linkUrl = `/${data[i].category}/${data[i].slug}`;
      linkUrl = linkUrl.replace(/\/$/, "");
      linkUrls.push({ url: linkUrl });
    }

    let weekUrls = [];
    let firstYear = 2012;
    let firstWeek = 19;

    const now = new Date(Date.now());
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

    const totalLinks = linkUrls.concat(weekUrls)
      .concat(`/about`)
      .concat(`/newsletters`)

    const sitemap = sm.createSitemap ({
      hostname: config.clientDomain,
      cacheTime: 600000,
      urls: totalLinks
    });

    callback.onSuccess("", "", "", sitemap.toString());

    return;
  });
};

module.exports = getSitemap;
