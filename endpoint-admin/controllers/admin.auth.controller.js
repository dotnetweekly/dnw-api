const AdminBaseController = require("./admin.base.controller");
const AuthHandler = require("../handlers/auth");

class AuthController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new AuthHandler();
  }

  login(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(
      req,
      res,
      true
    );
    this._handler.authenticate(req, response);
  }
}

module.exports = AuthController;
