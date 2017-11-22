var Newsletter = require("../../../db/models/newsletter.model");

const search = function(req, callback) {
  var query = Newsletter.find({});

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
