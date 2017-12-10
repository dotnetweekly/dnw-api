const BaseAutoBindedClass = require('../../../helpers/base.autobind');
const currentNewsletter = require('./currentNewsletter');

class EmailsHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.currentNewsletter = (req, callback) => currentNewsletter(req, callback);
	}
}

module.exports = EmailsHandler;
