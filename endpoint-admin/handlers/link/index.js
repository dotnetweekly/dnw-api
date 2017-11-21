const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const getItem = require("./getItem");
const updateItem = require("./updateItem");

class LinkHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.getItem = (req, callback) => getItem(req, callback);
    this.updateItem = (req, callback) => updateItem(req, callback);
  }
}

module.exports = LinkHandler;
