const jwt = require("jsonwebtoken");
const config = require("../../../config");
const User = require("../../../db/models/user.model");

const NotFoundError = require("../../../error/not-found");
const UnauthorizedError = require("../../../error/unauthorized");
const tokenHelper = require("../../../helpers/token.helper");

const authenticate = function(req, callback) {
  if (!req.body || (!req.body.username && !req.body.email)) {
    callback.onError(new NotFoundError());
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  const credentialName = username
    ? { username: req.body.username }
    : { email: req.body.email };

  User.findOne(credentialName, function(error, user) {
    if (error || !user) {
      callback.onError(new NotFoundError());
      return;
    }

    if (!user.checkPassword(password)) {
      callback.onError(new UnauthorizedError());
      return;
    }

    if (!user.isAdmin) {
      callback.onError(new UnauthorizedError());
      return;
    }

    callback.onSuccess(tokenHelper.generateAuthToken(user._id, user.isAdmin));
  });
};

module.exports = authenticate;
