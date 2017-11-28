const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const search = require("./search");
const getSingle = require("./getSingle");

class LinkHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.search = (req, callback) => search(req, callback);
    this.getSingle = (req, callback) => getSingle(req, callback);
  }
}

module.exports = LinkHandler;
