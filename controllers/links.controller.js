const BaseController = require("./base.controller");
const LinkHandler = require("../handlers/links");

class LinkController extends BaseController {
  constructor() {
    super();
    this._handler = new LinkHandler();
  }

  getAll(req, res, next) {
    this._handler.getAll(
      req,
      this._responseManager.getDefaultResponseHandler(res)
    );
  }
}

module.exports = LinkController;
