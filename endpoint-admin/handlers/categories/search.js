var Category = require("../../../db/models/category.model");

const search = function(req, callback) {
  var query = Category.find({});

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
