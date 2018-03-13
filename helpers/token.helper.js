const jwt = require('jsonwebtoken');
const config = require('../config');

const tokenHelper = {
	generateAuthToken(userId, isAdmin) {
		const timeToLive = 60 * 60 * 24 * 365;

		const token = jwt.sign(
			{
				data: {
					id: userId,
					isAdmin: isAdmin
				}
			},
			config.auth.secret,
			{ expiresIn: timeToLive }
		);

		var expirationDate = Math.floor(Date.now() / 1000) + timeToLive;

		return { token, expirationDate };
	}
};

module.exports = tokenHelper;
