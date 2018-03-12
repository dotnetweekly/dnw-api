const BaseController = require('./base.controller');
const LinkHandler = require('../handlers/links');
const RecaptchaError = require('../../error/recaptcha');

class LinkController extends BaseController {
	constructor() {
		super();
		this._linkHandler = new LinkHandler();
	}

	search(req, res, next) {
		const callback = this._responseManager.getResponseHandler(req, res, true);

		if (callback) {
			this._linkHandler.search(req, callback);
		}
	}

	getSingle(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);

		if (response) {
			this._linkHandler.getSingle(req, response);
		}
	}

	getLinkComments(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);

		if (response) {
			this._linkHandler.getLinkComments(req, response);
		}
	}

	getMeta(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);

		if (response) {
			this._linkHandler.getMeta(req, response);
		}
	}

	upvote(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res);

		// if (!req.recaptcha || (req.recaptcha && req.recaptcha.error)) {
		//   response.onError(recaptchaError.message);

		//   return;
		// }

		if (response) {
			this._linkHandler.upvote(req, response);
		}
	}

	downvote(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res);

		// if (!req.recaptcha || (req.recaptcha && req.recaptcha.error)) {
		//   response.onError(recaptchaError.message);

		//   return;
		// }

		if (response) {
			this._linkHandler.downvote(req, response);
		}
	}

	comment(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res);

		if (!req.recaptcha || (req.recaptcha && req.recaptcha.error)) {
			const recaptchaError = new RecaptchaError();
			response.onSuccess({
				errors: [{ field: 'recaptcha', error: recaptchaError.message }]
			});

			return;
		}

		if (response) {
			this._linkHandler.comment(req, response);
		}
	}

	add(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res);

		if (!req.recaptcha || (req.recaptcha && req.recaptcha.error)) {
			const recaptchaError = new RecaptchaError();
			response.onSuccess({
				errors: [{ field: 'recaptcha', error: recaptchaError.message }]
			});

			return;
		}

		if (response) {
			this._linkHandler.add(req, response);
		}
	}
}

module.exports = LinkController;
