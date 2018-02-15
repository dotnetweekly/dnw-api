const AdminBaseController = require("./admin.base.controller");
const Handler = require("../handlers/newsletters");

class NewslettersController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new Handler();
  }

  search(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.search(req, response);
    }
  }
}

module.exports = NewslettersController;
