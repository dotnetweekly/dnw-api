const HttpStatus = require('http-status-codes');
const AuthHandler = require('./auth');
const UnauthorizedError = require('../../error/unauthorized');

const BasicResponse = {
	success: false,
	message: '',
	data: {}
};

class ResponseManager {
	constructor() {}

	static get HTTP_STATUS() {
		return HttpStatus;
	}

	static authenticate(req, res) {
		const authHandler = new AuthHandler();
		const payload = authHandler.validate(req);
		const unauthorizedError = new UnauthorizedError();

		return payload ? payload.data : null;
	}

	static getResponseHandler(req, res, noAuth = false) {
		let user = ResponseManager.authenticate(req, res);

		if (!noAuth && !user) {
			ResponseManager.respondWithError(res, unauthorizedError.status);
			return;
		}

		return {
			user: user,
			onSuccess: function(data, message, code, xml = null) {
				ResponseManager.respondWithSuccess(
					res,
					code || ResponseManager.HTTP_STATUS.OK,
					data,
					message,
					[],
					xml
				);
			},
			onError: function(error) {
				ResponseManager.respondWithError(
					res,
					error.status || 500,
					error.message || 'Unknown error',
					error.errors || []
				);
			}
		};
	}

	static respondWithSuccess(res, code, data, message = '', errors = [], xml = null) {
		let response = Object.assign({}, BasicResponse);
		response.success = true;
		response.message = message;
		response.data = data;
		if (xml) {
			res.status(code);
			res.set('Content-Type', 'application/rss+xml; charset=UTF-8');
			res.send(xml);

			return;
		}
		res.status(code).json(response);
	}

	static respondWithError(res, errorCode, message = '', errors = []) {
		let response = Object.assign({}, BasicResponse);
		response.success = false;
		response.message = message;
		response.errors = errors;
		res.status(errorCode).json(response);
	}
}

module.exports = ResponseManager;
