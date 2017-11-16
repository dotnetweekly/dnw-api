const AdminBaseController = require("./admin.base.controller");
const LinkHandler = require("../handlers/links");

class LinkController extends AdminBaseController {
  constructor() {
    super();
    this._linkHandler = new LinkHandler();
  }

  getAll(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    this._linkHandler.getAll(req, response);
  }
}

module.exports = LinkController;
