const BaseController = require('./base.controller');
const LinkHandler = require('../handlers/newsletter');

class NewsletterController extends BaseController {
	constructor() {
		super();
		this._linkHandler = new LinkHandler();
	}

	search(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res, true);

		if (response) {
			this._linkHandler.search(req, response, false, false);
		}
	}
}

module.exports = NewsletterController;
