const sanitize = require('mongo-sanitize');
var Link = require("../../../db/models/link.model");
var Category = require("../../../db/models/category.model");
var CalendarHelper = require("../../../helpers/calendar.helper");

const search = function(req, callback, olderLinks = false) {
  let week = sanitize(req.query.week);
  let year = sanitize(req.query.year);
  const category = sanitize(req.query.category);
  const now = new Date(Date.now());
  const userId = callback.user ? callback.user.id : null;

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
        search(req, callback, true);

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

      const returnData = {
        links: olderLinks ? [] : data,
        olderLinks: olderLinks ? data : []
      };

      callback.onSuccess(returnData);
    }
  });
};

module.exports = search;
