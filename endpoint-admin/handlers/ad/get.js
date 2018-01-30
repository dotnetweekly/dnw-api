const AdModel = require("../../../db/models/ad.model");
const sanitize = require('mongo-sanitize');

const search = function(req, callback) {
  const id = sanitize(req.params.id);
  if (!id) {
    callback.onError("Not Found");
    return;
  }

  var query = AdModel.findOne({ _id: id });

  query.exec(function(err, data) {
    if (err) {
      callback.onError("Not Found");
      return;
    } else {
      callback.onSuccess(data);
    }
  });
};

module.exports = search;
