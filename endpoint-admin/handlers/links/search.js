const sanitize = require('mongo-sanitize');
var Link = require("../../../db/models/link.model");
var CalendarHelper = require("../../../helpers/calendar.helper");

const getAll = function(req, callback) {
  let week = sanitize(req.query.week);
  let year = sanitize(req.query.year);
  const category = sanitize(req.query.category);
  const name = sanitize(req.query.name);
  
  const now = new Date(Date.now());

  if (!week || !year) {
    week = CalendarHelper.getWeek(now);
    year = now.getFullYear();
  }
  const dateRange = CalendarHelper.getDateRangeOfWeek(parseInt(week), parseInt(year));
  console.log(now);
  var searchParams = {};
  searchParams.createdOn = { $gte: dateRange.from, $lte: dateRange.to };

  if (name) {
    const regexSearch = new RegExp(`.*?${name}.*?`);
    searchParams.title = { $regex: regexSearch, $options: 'i' }
  }

  var query = Link.find(searchParams);

  query
    .populate("user")
    .sort({ createdOn: "desc" })

  query.exec(function(err, data) {
    if (err) {
      callback.onError([]);

      return;
    } else {
      if (category) {
        data = data.filter(link => {
          if (!category || (link.category && link.category === category)) {
            return link;
          }
        });
      }
      callback.onSuccess(data);
    }
  });
};

module.exports = getAll;
