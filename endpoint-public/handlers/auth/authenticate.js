const sanitize = require('mongo-sanitize');
const User = require("../../../db/models/user.model");

const NotFoundError = require("../../../error/not-found");
const UnauthorizedError = require("../../../error/unauthorized");
const tokenHelper = require("../../../helpers/token.helper");

const authenticate = function(req, callback) {
  const username = sanitize(req.body.username) || sanitize(req.query.username);
  const password = sanitize(req.body.password) || sanitize(req.query.password);
  const email = sanitize(req.body.email) || sanitize(req.query.email);

  const credentialName = username
    ? { username: username, isActive: true }
    : { email: email, isActive: true };

  User.findOne(credentialName, function(error, user) {
    if (error || !user) {
      callback.onError(new NotFoundError());
      return;
    }

    if (!user.checkPassword(password)) {
      const errors = [
        {
          field: 'email',
          error: 'Invalid Credentials'
        },
        {
          field: 'password',
          error: 'Invalid Credentials'
        }
      ]
      callback.onError(new UnauthorizedError("", errors));
      return;
    }

    callback.onSuccess(tokenHelper.generateAuthToken(user._id, user.isAdmin));
  });
};

module.exports = authenticate;
