const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const search = require("./search");
const update = require("./update");

class CategoryHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.search = (req, callback) => search(req, callback);
    this.update = (req, callback) => update(req, callback);
  }
}

module.exports = CategoryHandler;
