const BaseAutoBindedClass = require('../../../helpers/base.autobind');
const profile = require('./profile');
const submitted = require('./submitted');
const upvotes = require('./upvotes');
const comments = require('./comments');
const saveProfile = require('./saveProfile');
const updateEmail = require('./updateEmail');

class UserHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.profile = (req, callback) => profile(req, callback);
		this.submitted = (req, callback) => submitted(req, callback);
		this.upvotes = (req, callback) => upvotes(req, callback);
		this.comments = (req, callback) => comments(req, callback);
		this.saveProfile = (req, callback) => saveProfile(req, callback);
		this.updateEmail = (req, callback) => updateEmail(req, callback);
	}
}

module.exports = UserHandler;
