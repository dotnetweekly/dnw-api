const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../../db/models/user.model");

const NotFoundError = require("../../error/not-found");
const UnauthorizedError = require("../../error/unauthorized");

const authenticate = function(req, callback) {
  const username = req.body.username;
  const password = req.body.password;

  const credentialName = username
    ? { username: req.body.username }
    : { email: req.body.email };

  User.findOne(credentialName, function(error, user) {
    if (error || !user) {
      callback.onError(new NotFoundError("User not found"));
      return;
    }

    if (!user.checkPassword(password)) {
      callback.onError(new UnauthorizedError());
      return;
    }

    callback.onSuccess(
      jwt.sign(
        {
          data: {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
          }
        },
        config.auth.secret,
        { expiresIn: 60 * 60 * 24 * 365 }
      )
    );
  });
};

module.exports = authenticate;
