const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../../db/models/user.model");

const validate = function(req, callback) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    callback(err, null);
    return;
  }

  jwt.verify(token, config.auth.secret, { ignoreExpiration: false }, function(
    err,
    user
  ) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, user);
  });
};

module.exports = validate;
