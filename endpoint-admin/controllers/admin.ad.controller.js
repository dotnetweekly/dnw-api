const AdminBaseController = require("./admin.base.controller");
const AdHandler = require("../handlers/ad");

class AdController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new AdHandler();
  }

  update(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.update(req, response);
    }
  }

  get(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.get(req, response);
    }
  }
}

module.exports = AdController;
