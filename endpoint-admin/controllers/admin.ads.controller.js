const AdminBaseController = require("./admin.base.controller");
const AdsHandler = require("../handlers/ads");

class AdsController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new AdsHandler();
  }

  search(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.search(req, response);
    }
  }

  update(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.update(req, response);
    }
  }

  deleteAds(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.deleteAds(req, response);
    }
  }
}

module.exports = AdsController;
