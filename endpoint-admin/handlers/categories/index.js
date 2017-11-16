const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const getAll = require("./getAll");
const updateStatus = require("./updateStatus");

class CategoryHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.getAll = (req, callback) => getAll(req, callback);
    this.updateStatus = (req, callback) => updateStatus(req, callback);
  }
}

module.exports = CategoryHandler;
