const AdminBaseController = require('./admin.base.controller');
const EmailHandler = require('../handlers/emails');

class EmailsController extends AdminBaseController {
	constructor() {
		super();
		this._handler = new EmailHandler();
	}

	sendNewsletter(req, res, next) {
		const response = this._adminResponseManager.getResponseHandler(req, res);
		if (response) {
			this._handler.sendNewsletter(req, response);
		}
	}

	currentNewsletter(req, res, next) {
		const response = this._adminResponseManager.getResponseHandler(req, res);
		if (response) {
			this._handler.currentNewsletter(req, response);
		}
	}

	activateUser(req, res, next) {
		const response = this._adminResponseManager.getResponseHandler(req, res);
		if (response) {
			this._handler.activateUser(req, response);
		}
	}

	forgotPassword(req, res, next) {
		const response = this._adminResponseManager.getResponseHandler(req, res);
		if (response) {
			this._handler.forgotPassword(req, response);
		}
	}

	updateEmail(req, res, next) {
		const response = this._adminResponseManager.getResponseHandler(req, res);
		if (response) {
			this._handler.updateEmail(req, response);
		}
	}

	sendCustom(req, res, next) {
		const response = this._adminResponseManager.getResponseHandler(req, res);
		if (response) {
			this._handler.sendCustom(req, response);
		}
	}
}

module.exports = EmailsController;
