const BaseAutoBindedClass = require("../base.autobind");
const ResponseManager = require("../handlers/response");
const AuthHandler = require("../handlers/auth");

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
    AuthHandler.authenticate(req, function(err, user) {
      if (err) {
        responseManager.respondWithError(
          res,
          err.status || 401,
          err.message || ""
        );
      } else {
        callback(user);
      }
    });
  }
}

module.exports = BaseController;
