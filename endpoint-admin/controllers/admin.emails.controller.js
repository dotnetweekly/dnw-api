const AdminBaseController = require('./admin.base.controller');
const EmailHandler = require('../handlers/emails');

class EmailsController extends AdminBaseController {
	constructor() {
		super();
		this._handler = new EmailHandler();
	}

	currentNewsletter(req, res, next) {
		const response = this._adminResponseManager.getResponseHandler(req, res);
		if (response) {
			this._handler.currentNewsletter(req, response);
		}
	}
}

module.exports = EmailsController;
