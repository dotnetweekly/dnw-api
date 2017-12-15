const BaseController = require('./base.controller');
const UserHandler = require('../handlers/user');

class UserController extends BaseController {
	constructor() {
		super();
		this._userHandler = new UserHandler();
	}

	profile(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res);

		if (response) {
			this._userHandler.profile(response);
		}
	}
	
	saveProfile(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res);

		if (response) {
			this._userHandler.saveProfile(req, response);
		}
	}

	submitted(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);

		if (response) {
			this._userHandler.submitted(req, response);
		}
	}

	upvotes(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);

		if (response) {
			this._userHandler.upvotes(req, response);
		}
	}

	comments(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);

		if (response) {
			this._userHandler.comments(req, response);
		}
	}
	
	updateEmail(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);

		if (response) {
			this._userHandler.updateEmail(req, response);
		}
	}
	
	forgotPassword(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);

		if (response) {
			this._userHandler.forgotPassword(req, response);
		}
	}
}

module.exports = UserController;
