const User = require("../../../db/models/user.model");
const NotFoundError = require("../../../error/not-found");

const profile = function (callback) {
  var query = User.findOne({ _id: callback.user.id }, [
    "email",
    "firstName",
    "lastName",
    "isAdmin",
    "subscribed"
  ]);

  query.exec(function (err, data) {
    if (err) {
      callback.onError({});
      return;
    } else {
      if (data) {
        callback.onSuccess(data);
        return;
      }
      callback.onError(new NotFoundError());
    }
  });
};

module.exports = profile;
