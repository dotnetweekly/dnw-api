const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const search = require("./search");
const updateItems = require("./updateItems");
const deleteItems = require("./deleteItems");

class NewslettersHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.search = (req, callback) => search(req, callback);
    this.updateItems = (req, callback) => updateItems(req, callback);
    this.deleteItems = (req, callback) => deleteItems(req, callback);
  }
}

module.exports = NewslettersHandler;
