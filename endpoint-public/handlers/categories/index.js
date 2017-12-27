const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const getCategories = require("./getCategories");

class CategoriesHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.getCategories = (req, callback) => getCategories(req, callback);
  }
}

module.exports = CategoriesHandler;
