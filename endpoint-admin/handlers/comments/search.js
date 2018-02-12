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

  let query = Link.find(searchParams)
  .populate("user");

  query.exec(function (err, data) {
    if (err) {
      callback.onError([]);
      return;
    } else {
      const comments = [];
      for (var i = 0; i < data.length; i++) {

        if (!link) {
          comments.push(...data[i].comments.filter(c => !c.isActive));
        } else {
          comments.push(...data[i].comments);
        }
      }
      callback.onSuccess(comments);
    }
  });
};

module.exports = search;
