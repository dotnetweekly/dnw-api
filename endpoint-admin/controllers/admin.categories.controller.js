const AdminBaseController = require("./admin.base.controller");
const CategoryHandler = require("../handlers/categories");

class CategoriesController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new CategoryHandler();
  }

  search(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.search(req, response);
    }
  }
}

module.exports = CategoriesController;
