var Link = require("../../../db/models/link.model");

const search = function(req, callback) {
  var query = Link.find({}, ["title", "url", "createdOn", "slug", "upvotes"]);

  query
    .populate("category", "slug")
    .populate("tags")
    .populate("user", "username")
    .sort({ title: "desc" })
    .limit(12);

  query.exec(function(err, data) {
    if (err) {
      callback.onError([]);
      return;
    } else {
      const returnData = {
        totalPages: 2,
        links: data
      };
      callback.onSuccess(returnData);
    }
  });
};

module.exports = search;
