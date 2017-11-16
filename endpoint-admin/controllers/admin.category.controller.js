const AdminBaseController = require("./admin.base.controller");
const CategoryHandler = require("../handlers/categories");

class CategoryController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new CategoryHandler();
  }

  getAll(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.getAll(req, response);
    }
  }

  updateStatus(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.updateStatus(req, response);
    }
  }
}

module.exports = CategoryController;
