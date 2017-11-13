var Link = require("../db/models/link.model");

exports.list = function(req, res) {
  var query = Link.find({}, [
    "title",
    "content",
    "tags",
    "url",
    "user",
    "category"
  ]);

  query
    .populate("category")
    .populate("user")
    .sort({ title: "desc" })
    .limit(12)
    .exec(function(err, results) {
      res.json(results);
    });
};
