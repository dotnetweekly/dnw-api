const sanitize = require('mongo-sanitize');
const Feed = require('feed');

var Link = require("../../../db/models/link.model");
var Category = require("../../../db/models/category.model");
var CalendarHelper = require("../../../helpers/calendar.helper");
const config = require("../../../config/");

const search = function(req, callback, olderLinks = false) {
  let week = sanitize(req.query.week);
  let year = sanitize(req.query.year);
  const category = sanitize(req.query.category);
  const now = new Date(Date.now());
  const userId = callback.user ? callback.user.id : null;
	const rss = req.query.feed;

  if (!week || !year) {
    week = CalendarHelper.getWeek(now);
    year = now.getFullYear();
  }

  var searchParams = { isActive: true };

  const dateRange = CalendarHelper.getDateRangeOfWeek(week, year);
  searchParams.createdOn = { $gte: dateRange.from, $lte: dateRange.to };

  var query = Link.find(searchParams, [
    "title",
    "url",
    "createdOn",
    "slug",
    "upvotes"
  ]);
  
  query
    .populate("category", ["name", "slug"])
    .populate("tags")
    .populate("user", "username")
    .sort({ title: "desc" });

  query.exec(function(err, data) {
    if (err) {
      callback.onError([]);

      return;
    } else {
      if (!data || data.length === 0) {
        req.query.week = week == 1 ? 52 : week - 1;
        req.query.year = week == 1 ? year - 1 : year;
        search(req, callback, true, rss);

        return;
      }

      data = data.sort(function(a, b) {
        return b.upvotes.length - a.upvotes.length;
      });

      data = data.filter(link => {
        let newLink = link._doc;
        newLink.upvoteCount = newLink.upvotes.length;
        newLink.hasUpvoted = newLink.upvotes.some(upvote => {
          return !userId ? false : upvote.trim() == userId.trim();
        });
        newLink.upvotes = [];
        return newLink;
      });

      if (category) {
        data = data.filter(link => {
          if (!category || (link.category && link.category.slug === category)) {
            return link;
          }
        });
      }

      if (rss) {
        callback.onSuccess("", "", "",
          getFeed(data, req.query.week, req.query.year)
        );

        return;
      }

      const returnData = {
        links: olderLinks ? [] : data,
        olderLinks: olderLinks ? data : []
      };

      callback.onSuccess(returnData);
    }
  });
};

function getFeed(data, week, year) {
  var feed = new Feed({
    id: `${config.clientDomain}feed/week/${week}/year/${year}`,
    title: `dotNET Weekly - Week ${week} Year ${year}`,
    link: `${config.clientDomain}feed/week/${week}/year/${year}`,
    updated: new Date()
  });
  const categories = [];
  for (var i = 0; i < data.length; i++) {
    const link = data[i];
    feed.addItem({
      title:  link.title,
      id: `${config.clientDomain}articles/${link.slug}`,
      link: `${config.clientDomain}articles/${link.slug}`,
      date: link.createdOn
    });
    if (!categories.includes(link.category.name)){
      feed.addCategory(link.category.name);
      categories.push(link.category.name);
    }
  }
  return feed.atom1();
}

module.exports = search;
