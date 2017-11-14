const BaseController = require("./base.controller");
const AuthHandler = require("../handlers/auth");

class AuthController extends BaseController {
  constructor() {
    super();
    this._handler = new AuthHandler();
  }

  login(req, res, next) {
    this._handler.authenticate(
      req,
      this._responseManager.getDefaultResponseHandler(res)
    );
  }

  register(req, res, next) {
    this._handler.register(
      req,
      this._responseManager.getDefaultResponseHandler(res)
    );
  }
}

module.exports = AuthController;
