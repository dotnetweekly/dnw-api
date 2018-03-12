const BaseAutoBindedClass = require('../../../helpers/base.autobind');
const currentNewsletter = require('./currentNewsletter');
const activateUser = require('./activateUser');
const forgotPassword = require('./forgotPassword');
const updateEmail = require('./updateEmail');
const sendCustom = require('./custom');
const sendNewsletter = require('./sendNewsletter');

class EmailsHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.sendNewsletter = (req, callback) => sendNewsletter(req, callback);
		this.currentNewsletter = (req, callback) => currentNewsletter(req, callback);
		this.activateUser = (req, callback) => activateUser(req, callback);
		this.forgotPassword = (req, callback) => forgotPassword(req, callback);
		this.updateEmail = (req, callback) => updateEmail(req, callback);
		this.sendCustom = (req, callback) => sendCustom(req, callback);
	}
}

module.exports = EmailsHandler;
