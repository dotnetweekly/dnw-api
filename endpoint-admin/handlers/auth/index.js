const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const validate = require("./validate");
const authenticate = require("./authenticate");

class AuthHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.validate = (req, callback) => validate(req, callback);
    this.authenticate = (req, callback) => authenticate(req, callback);
  }
}

module.exports = AuthHandler;
