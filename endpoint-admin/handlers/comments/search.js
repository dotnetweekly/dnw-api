var Link = require("../../../db/models/link.model");
const sanitize = require('mongo-sanitize');

const search = function (req, callback) {
  const link = sanitize(req.params.link);
  let searchParams = { _id: link };

  if (!link) {
    searchParams = {
      "comments.isActive": false
    }
  }

  let query = Link.findOne(searchParams)
  .populate("user");

  query.exec(function (err, data) {
    if (err) {
      callback.onError([]);
      return;
    } else {
      callback.onSuccess(data.comments);
    }
  });
};

module.exports = search;
