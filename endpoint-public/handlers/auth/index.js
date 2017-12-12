const BaseAutoBindedClass = require('../../../helpers/base.autobind');
const authenticate = require('./authenticate');
const register = require('./register');
const validate = require('./validate');
const activate = require('./activate');

class AuthHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.authenticate = (req, callback) => authenticate(req, callback);
		this.register = (req, callback) => register(req, callback);
		this.validate = (req, callback) => validate(req, callback);
		this.activate = (req, callback) => activate(req, callback);
	}
}

module.exports = AuthHandler;
