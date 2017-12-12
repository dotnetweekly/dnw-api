const BaseAutoBindedClass = require('../../../helpers/base.autobind');
const currentNewsletter = require('./currentNewsletter');
const activateUser = require('./activateUser');


class EmailsHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.currentNewsletter = (req, callback) => currentNewsletter(req, callback);
		this.activateUser = (req, callback) => activateUser(req, callback);
	}
}

module.exports = EmailsHandler;
