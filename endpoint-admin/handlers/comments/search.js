var Link = require("../../../db/models/link.model");
const sanitize = require('mongo-sanitize');

const search = function (req, callback) {
  const link = sanitize(req.params.link);
  var query = Link.findOne({ _id: link });

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
