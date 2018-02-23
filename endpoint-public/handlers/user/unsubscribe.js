const sanitize = require('mongo-sanitize');
const Guid = require("guid");
const UserModel = require("../../../db/models/user.model");

const NotFoundError = require("../../../error/not-found");
const UnauthorizedError = require("../../../error/unauthorized");

const unsubscribe = function(req, callback) {
  const key = sanitize(req.body.key);
  UserModel.findOne({ keyUnsubscribe: key, isActive: true }, function(error, user) {
    if (error || !user) {
      callback.onSuccess({ error: "User not found or not activated yet." });
      return;
    }

    user.subscribed = false;
    user.keyUnsubscribe = Guid.raw();

    user.save(function(err) {
      callback.onSuccess({});
    });
  });
};

module.exports = unsubscribe;
