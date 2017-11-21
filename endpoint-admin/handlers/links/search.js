var Link = require("../../../db/models/link.model");

const getAll = function(req, callback) {
  var query = Link.find({});

  query
    .populate("user")
    .sort({ createdOn: "desc" })
    .limit(12);

  query.exec(function(err, data) {
    if (err) {
      callback.onError([]);
      return;
    } else {
      callback.onSuccess(data);
    }
  });
};

module.exports = getAll;
