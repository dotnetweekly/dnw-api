const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../db/models/user.model");

const UserHelper = {
  async getCurrentUser(tokenData, callback) {
    if (!tokenData) {
      return null;
    }
    return User.findOne({ _id: tokenData.id }, function(err, user) {
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
  }
};

module.exports = UserHelper;
