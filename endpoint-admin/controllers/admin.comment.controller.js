const AdminBaseController = require("./admin.base.controller");
const CommentHandler = require("../handlers/comment");

class CommentController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new CommentHandler();
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

  getSingleComment(req, res, next) {
    const response = this._adminResponseManager.getResponseHandler(req, res);
    if (response) {
      this._handler.getSingleComment(req, response);
    }
  }
}

module.exports = CommentController;
