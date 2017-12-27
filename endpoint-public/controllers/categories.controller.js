const BaseController = require("./base.controller");
const CategoriesHandler = require("../handlers/categories");

class CategoriesController extends BaseController {
  constructor() {
    super();
    this._categoriesHandler = new CategoriesHandler();
  }

  getCategories(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (response) {
      this._categoriesHandler.getCategories(req, response);
    }
  }
}

module.exports = CategoriesController;
