const BaseController = require("./base.controller");
const LinkHandler = require("../handlers/links");

class LinkController extends BaseController {
  constructor() {
    super();
    this._linkHandler = new LinkHandler();
  }

  search(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (response) {
      this._linkHandler.search(req, response);
    }
  }

  getSingle(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (response) {
      this._linkHandler.getSingle(req, response);
    }
  }

  getLinkComments(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (response) {
      this._linkHandler.getLinkComments(req, response);
    }
  }
}

module.exports = LinkController;
