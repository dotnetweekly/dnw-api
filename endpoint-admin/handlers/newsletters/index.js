const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const search = require("./search");

class NewslettersHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.search = (req, callback) => search(req, callback);
  }
}

module.exports = NewslettersHandler;
