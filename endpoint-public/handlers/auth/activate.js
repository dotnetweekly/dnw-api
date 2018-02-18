const sanitize = require('mongo-sanitize');
const Guid = require("guid");
const UserModel = require("../../../db/models/user.model");
const tokenHelper = require("../../../helpers/token.helper");

const NotFoundError = require("../../../error/not-found");
const UnauthorizedError = require("../../../error/unauthorized");

const unsubscribe = function(req, callback) {
  const key = sanitize(req.body.key);
  UserModel.findOne({ guid: key, isActive: false }, function(error, user) {
    if (error || !user) {
      callback.onSuccess({ error: "User not found or already activated." });
      return;
    }

    user.subscribed = true;
    user.isActive = true;
    user.guid = Guid.create();
    
    user.save(function(err) {
      callback.onSuccess(tokenHelper.generateAuthToken(user._id, user.isAdmin));
    });
  });
};

module.exports = unsubscribe;
