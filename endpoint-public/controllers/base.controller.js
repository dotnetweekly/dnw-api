const BaseAutoBindedClass = require("../../helpers/base.autobind");
const ResponseManager = require("../handlers/response");
const AuthHandler = require("../handlers/auth");
const config = require("../../config");
const UnauthorizedError = require("../../error/unauthorized");

class BaseController extends BaseAutoBindedClass {
  constructor() {
    super();

    if (new.target === BaseController) {
      throw new TypeError("Cannot construct BaseController instances directly");
    }
    this._responseManager = ResponseManager;
  }

  getAll(req, res) {}

  get(req, res) {}

  create(req, res) {}

  update(req, res) {}

  remove(req, res) {}

  authenticate(req, res, callback) {
    const authHandler = new AuthHandler();
    const response = this._responseManager.getDefaultResponseHandler(res);

    authHandler.validate(req, function(err, payload) {
      if (err) {
        response.onError(new UnauthorizedError());
        return;
      }
      callback(payload.data);
    });
  }
}

module.exports = BaseController;
