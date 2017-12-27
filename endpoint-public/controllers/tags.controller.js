const BaseController = require("./base.controller");
const TagsHandler = require("../handlers/tags");

class TagsController extends BaseController {
  constructor() {
    super();
    this._tagHandler = new TagsHandler();
  }

  getTags(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (response) {
      this._tagHandler.getTags(req, response);
    }
  }
}

module.exports = TagsController;
