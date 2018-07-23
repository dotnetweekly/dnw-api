const AdminBaseController = require("./admin.base.controller");
const AdsHandler = require("../handlers/links");

class AdsController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new AdsHandler();
  }

  search(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      req.query = req.query || {};
      req.query.sponsored = true;
      this._handler.search(req, response);
    }
  }
}

module.exports = AdsController;
