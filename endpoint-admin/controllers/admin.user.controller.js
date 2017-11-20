const AdminBaseController = require("./admin.base.controller");
const UserHandler = require("../handlers/user");

class UserController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new UserHandler();
  }

  updateItem(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.updateItem(req, response);
    }
  }

  getItem(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.getItem(req, response);
    }
  }
}

module.exports = UserController;
