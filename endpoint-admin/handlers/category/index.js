const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const get = require("./get");
const update = require("./update");

class CategoryHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.get = (req, callback) => get(req, callback);
    this.update = (req, callback) => update(req, callback);
  }
}

module.exports = CategoryHandler;
