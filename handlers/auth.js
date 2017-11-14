const BaseAutoBindedClass = require("../base.autobind");
const jsonwebtoken = require("jsonwebtoken");

class AuthHandler extends BaseAutoBindedClass {
  authenticate(req, callback) {}
}

module.exports = AuthHandler;
