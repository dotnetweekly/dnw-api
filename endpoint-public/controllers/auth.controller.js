const BaseController = require('./base.controller');
const AuthHandler = require('../handlers/auth');

class AuthController extends BaseController {
	constructor() {
		super();
		this._handler = new AuthHandler();
	}

	login(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);
		this._handler.authenticate(req, response);
	}

	register(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);
		this._handler.register(req, response);
	}

	activate(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);
		this._handler.activate(req, response);
	}
}

module.exports = AuthController;
