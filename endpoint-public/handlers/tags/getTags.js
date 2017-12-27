var Tag = require("../../../db/models/tag.model");

const getTags = function(req, callback) {
  var query = Tag.find({ isActive: true }, ["_id", "name", "slug"]);

  query.exec(function(err, data) {
    if (err) {
      callback.onError([]);
      return;
    } else {
      callback.onSuccess(data);
    }
  });
};

module.exports = getTags;
