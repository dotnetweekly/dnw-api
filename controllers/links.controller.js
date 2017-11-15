const BaseController = require("./base.controller");
const LinkHandler = require("../handlers/links");

class LinkController extends BaseController {
  constructor() {
    super();
    this._linkHandler = new LinkHandler();
  }

  getAll(req, res, next) {
    const response = this._responseManager.getDefaultResponseHandler(res);
    this._linkHandler.getAll(req, response);
  }
}

module.exports = LinkController;
