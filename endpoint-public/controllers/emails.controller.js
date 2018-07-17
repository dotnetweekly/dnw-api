const AdminBaseController = require('./base.controller');
const EmailHandler = require('../handlers/emails');

class EmailsController extends AdminBaseController {
  constructor() {
    super();
    this._handler = new EmailHandler();
  }
  
  currentNewsletter(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);
    if (response) {
      this._handler.currentNewsletter(req, response);
    }
  }

  sponsoredCount(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);
    if (response) {
      this._handler.sponsoredCount(req, response);
    }
  }
}

module.exports = EmailsController;
