var User = require("../../../db/models/user.model");

const search = function(req, callback) {
  const id = req.params.id;
  if (!id) {
    callback.onError("Not Found");
    return;
  }

  var query = User.findOne({ _id: id });

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
