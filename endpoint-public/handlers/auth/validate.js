const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');
const config = require('../../../config');
const User = require('../../../db/models/user.model');

const validate = function(req) {
	let token = sanitize(req.headers.authorization);

	if (!token) {
		return null;
	}

	token = token.replace('Bearer ', '');
	token = jwt.verify(token, config.auth.secret, {
		ignoreExpiration: false
	});

	if (!token || !token.data) {
		return null;
	}

	return token;
};

module.exports = validate;
