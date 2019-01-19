const AdminBaseController = require("./admin.base.controller");
const LinkHandler = require("../handlers/link");

class LinkController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new LinkHandler();
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

  newsletterSent(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.newsletterSent(req, response);
    }
  }

  newsletterOpen(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.newsletterOpen(req, response);
    }
  }

  newsletterClick(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.newsletterClick(req, response);
    }
  }
}

module.exports = LinkController;
