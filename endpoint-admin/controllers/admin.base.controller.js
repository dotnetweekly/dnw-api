const BaseAutoBindedClass = require("../../helpers/base.autobind");
const AdminResponseManager = require("../handlers/response");
const config = require("../../config");
const UnauthorizedError = require("../../error/unauthorized");

class AdminBaseController extends BaseAutoBindedClass {
  constructor() {
    super();

    if (new.target === AdminBaseController) {
      throw new TypeError(
        "Cannot construct AdminBaseController instances directly"
      );
    }
    this._adminResponseManager = AdminResponseManager;
  }

  getAll(req, res) {}

  get(req, res) {}

  create(req, res) {}

  update(req, res) {}

  remove(req, res) {}
}

module.exports = AdminBaseController;
