const BaseAutoBindedClass = require("../../base.autobind");
const getAll = require("./getAll");

class LinkHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.getAll = (req, callback) => getAll(req, callback);
  }
}

module.exports = LinkHandler;
