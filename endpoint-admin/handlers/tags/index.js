const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const search = require("./search");
const updateItems = require("./updateItems");
const deleteItems = require("./deleteItems");

class TagsHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.search = (req, callback) => search(req, callback);
  }
}

module.exports = TagsHandler;
