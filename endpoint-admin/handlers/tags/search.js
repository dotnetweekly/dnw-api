var Tag = require("../../../db/models/tag.model");

const search = function(req, callback) {
  var query = Tag.find({});

  query.exec(function(err, data) {
    if (err) {
      callback.onError([]);
      return;
    } else {
      callback.onSuccess(data);
    }
  });
};

module.exports = search;
