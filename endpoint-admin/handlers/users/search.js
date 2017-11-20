var User = require("../../../db/models/user.model");

const search = function(req, callback) {
  var query = User.find({});

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
