var Link = require("../../../db/models/link.model");
const sanitize = require('mongo-sanitize');

const search = function (req, callback) {
  const id = sanitize(req.params.id);
  if (!id) {
    callback.onError("Not Found");
    return;
  }

  var query = Link.findOne({ _id: id })
    .populate("category")
    .populate("tags")
    .populate("user");;

  query.exec(function (err, data) {
    if (err) {
      callback.onError("Not Found");
      return;
    } else {
      callback.onSuccess(data);
    }
  });
};

module.exports = search;
