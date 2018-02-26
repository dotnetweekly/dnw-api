const sm = require('sitemap');
const sanitize = require('mongo-sanitize');

const config = require("../../../config/");
var Link = require("../../../db/models/link.model");
var CalendarHelper = require("../../../helpers/calendar.helper");

const getSitemapWeek = function(req, callback) {
  let week = sanitize(req.params.week);
  let year = sanitize(req.params.year);

  if(!week || !year){
    const sitemap = sm.createSitemap ({
      hostname: config.clientDomain,
      cacheTime: 600000,
      urls: []
    });

    callback.onSuccess("", "", "", sitemap.toString());
    return;
  }

  week = parseInt(week);
  year = parseInt(year);

  var searchParams = { isActive: true };

  const dateRange = CalendarHelper.getDateRangeOfWeek(week, year);
  searchParams.createdOn = { $gte: dateRange.from, $lte: dateRange.to };

  var query = Link.find(searchParams, [
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

    const totalLinks = linkUrls;

    const sitemap = sm.createSitemap ({
      hostname: config.clientDomain,
      cacheTime: 600000,
      urls: totalLinks
    });

    callback.onSuccess("", "", "", sitemap.toString());

    return;
  });
};

module.exports = getSitemapWeek;
