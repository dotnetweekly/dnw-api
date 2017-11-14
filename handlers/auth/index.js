const BaseAutoBindedClass = require("../../base.autobind");
const authenticate = require("./authenticate");
const register = require("./register");

class AuthHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.authenticate = (req, callback) => authenticate(req, callback);
    this.register = (req, callback) => register(req, callback);
  }
}

module.exports = AuthHandler;
