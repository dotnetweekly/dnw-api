const AdminBaseController = require("./admin.base.controller");
const Handler = require("../handlers/tags");

class TasksController extends AdminBaseController {
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

  // updateItems(req, res, next) {
  //   const response = this._adminResponseManager.getResponseHandler(req, res);
  //   if (response) {
  //     this._handler.updateItems(req, response);
  //   }
  // }

  // deleteItems(req, res, next) {
  //   const response = this._adminResponseManager.getResponseHandler(req, res);
  //   if (response) {
  //     this._handler.deleteItems(req, response);
  //   }
  // }
}

module.exports = TasksController;
