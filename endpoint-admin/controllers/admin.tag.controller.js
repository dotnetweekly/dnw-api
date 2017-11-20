const AdminBaseController = require("./admin.base.controller");
const TagHandler = require("../handlers/tag");

class TagController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new TagHandler();
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

module.exports = TagController;
