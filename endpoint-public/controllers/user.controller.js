const BaseController = require("./base.controller");
const UserHandler = require("../handlers/user");

class UserController extends BaseController {
  constructor() {
    super();
    this._userHandler = new UserHandler();
  }

  profile(req, res, next) {
    const response = this._responseManager.getDefaultResponseHandler(res);

    this.authenticate(req, res, user => {
      this._userHandler.profile(user, response);
    });
  }
}

module.exports = UserController;
