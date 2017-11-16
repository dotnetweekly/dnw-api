const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const profile = require("./profile");

class UserHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.profile = (req, callback) => profile(req, callback);
  }
}

module.exports = UserHandler;
