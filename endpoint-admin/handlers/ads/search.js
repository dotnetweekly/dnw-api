var AdModel = require("../../../db/models/ad.model");

const search = function(req, callback) {
  var query = AdModel.find({});

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
