const AdminBaseController = require("./admin.base.controller");
const NewsletterHandler = require("../handlers/newsletter");

class NewsletterController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new NewsletterHandler();
  }

  updateItem(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.updateItem(req, response);
    }
  }

  getItem(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.getItem(req, response);
    }
  }
}

module.exports = NewsletterController;
