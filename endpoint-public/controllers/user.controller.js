const BaseController = require("./base.controller");
const UserHandler = require("../handlers/user");

class UserController extends BaseController {
  constructor() {
    super();
    this._userHandler = new UserHandler();
  }

  profile(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res);

    if (response) {
      this._userHandler.profile(response);
    }
  }
}

module.exports = UserController;
