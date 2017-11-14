const jwt = require("jsonwebtoken");
const config = require("../../config");
var User = require("../../db/models/user.model");

const authenticate = function(req, callback) {
  const username = req.body.username;
  const password = req.body.password;

  const credentialName = username
    ? { username: req.body.username }
    : { email: req.body.email };

  User.findOne(credentialName, function(error, user) {
    if (error || !user) {
      callback.onError({ message: "No user found", status: 401 });
      return;
    }

    if (!user.checkPassword(password)) {
      callback.onError({ message: "Wrong password", status: 401 });
      return;
    }

    callback.onSuccess(
      jwt.sign(
        {
          data: {
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
