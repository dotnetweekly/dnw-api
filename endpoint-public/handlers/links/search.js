const sanitize = require('mongo-sanitize');
const Feed = require('feed');

var Link = require("../../../db/models/link.model");
var categories = require("../../../data/categories");
var CalendarHelper = require("../../../helpers/calendar.helper");
const config = require("../../../config/");

const search = function(req, callback, olderLinks = false) {
  let week = sanitize(req.query.week);
  let year = sanitize(req.query.year);

  if ( year && week ) {
    if (parseInt(year) < 2012) {
      year = 2012;
      week = 20;
    }
    if (parseInt(year) == 2012 && parseInt(week) < 19) {
      year = 2012;
      week = 20;
    }
  }

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
    "upvotes",
    "category",
    "content",
    "tags"
  ]);
  
  query
    .populate("user", "username")
    .sort({ createdOn: -1 });

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

      const zeroVotes = data.filter(link => {
        return link.upvotes.length === 0
      });

      let someVotes = data.filter(link => {
        return link.upvotes.length > 0
      });

      someVotes = someVotes.sort(function(a, b) {
        return b.upvotes.length - a.upvotes.length;
      });

      data = someVotes.concat(zeroVotes);

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
          if (!category || (link.category === category)) {
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

      data = data.map(link => {
        link.content = "";
        return link;
      })

      const returnData = {
        links: olderLinks ? [] : data,
        olderLinks: olderLinks ? data : [],
        serverWeek: CalendarHelper.getWeek(now),
        serverYear: now.getFullYear(),
        serverMonth: now.getMonth(),
        serverDate: now.getDate(),
        week: olderLinks ? CalendarHelper.getWeek(now) : week,
        year: olderLinks ? now.getFullYear() : year
      };

      callback.onSuccess(returnData);
    }
  });
};

function getFeed(data, week, year) {
  const now = new Date(Date.now());
  const currentWeek = CalendarHelper.getWeek(now);
  const currentYear = now.getFullYear();
  const isNow = week == currentWeek && year == currentYear;

  const feedId = isNow ? `${config.clientDomain}?feed=rss` : `${config.clientDomain}week/${week}/year/${year}?feed=rss`
  const feedTitle = isNow ? `dotNET Weekly | A free weekly newsletter on .NET latest` : `dotNET Weekly - Week ${week} Year ${year}`

  var feed = new Feed({
    id: feedId,
    title: feedTitle,
    link: feedId,
    updated: new Date()
  });
  const feedCategories = [];
  for (var i = 0; i < data.length; i++) {
    const link = data[i];
    feed.addItem({
      title:  link.title,
      id: `${config.clientDomain}articles/${link.slug}`,
      link: `${config.clientDomain}articles/${link.slug}`,
      date: link.createdOn,
      content: link.content,
      author: [{ 
        name: link.user.username,
        link: `${config.clientDomain}users/${link.user.username}`
      }],
      updated: link.createdOn
    });
    let feedCategory = categories.filter(category => {
      return category.slug == link.category;
    })
    if (feedCategory.length > 0) {
      feedCategory = feedCategory[0];
      if (!feedCategories.includes(feedCategory.name)) {
        feed.addCategory(feedCategory.name);
        feedCategories.push(feedCategory.name);
      }
    }
  }
  return feed.rss2();
}

module.exports = search;
