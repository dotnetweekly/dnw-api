const config = require("../../../config");
const axios = require("axios");
const sanitize = require('mongo-sanitize');

const Link = require("../../../db/models/link.model");
const Category = require("../../../db/models/category.model");
const CalendarHelper = require("../../../helpers/calendar.helper");
const Newsletter = require("../../../db/models/newsletter.model");

const currentNewsletter = function(req, callback) {
  const save = sanitize(req.body.save);
  let week = sanitize(req.query.week);
  let year = sanitize(req.query.year);
  const category = sanitize(req.query.category);
  const now = new Date(Date.now());

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
      if (category) {
        data = data.filter(link => {
          if (!category || (link.category && link.category.slug === category)) {
            return link;
          }
        });
      }

      data = data.sort(function(a, b) {
        return b.upvotes.length - a.upvotes.length;
      });

      axios.defaults.headers.common["Authorization"] =
        sanitize(req.headers.authorization);

      axios
        .post(`${config.newsletterDomain}api/v1/newsletters/current`, {
          links: data,
          save
        })
        .then(response => {
          if (save) {
            Newsletter.update({
            }, { $set: {
                week,
                year,
                isActive: true
              } 
            }, { upsert: true }, function (
              err
            ) {
              if (err) reject(err);
              resolve();
              callback.onSuccess(response.data.data);
            });
          } else {
            callback.onSuccess(response.data.data);
          }
        })
        .catch(error => {
          callback.onError(error);
        });
    }
  });
};

module.exports = currentNewsletter;
