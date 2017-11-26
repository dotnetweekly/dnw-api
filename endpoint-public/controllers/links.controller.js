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
}

module.exports = LinkController;
