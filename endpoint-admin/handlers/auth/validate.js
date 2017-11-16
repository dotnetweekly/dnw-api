const jwt = require("jsonwebtoken");
const config = require("../../../config");
const User = require("../../../db/models/user.model");

const validate = function(req) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return null;
  }

  var token = jwt.verify(token, config.auth.secret, {
    ignoreExpiration: false
  });

  if (!token || !token.data || !token.data.isAdmin) {
    return null;
  }

  return token;
};

module.exports = validate;
