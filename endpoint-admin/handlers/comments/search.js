var LinkComment = require("../../../db/models/comment.model");

const search = function(req, callback) {
  var query = LinkComment.find({});

  query.populate("user").populate("link");

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
