const jwt = require('jsonwebtoken');
const config = require('../../../config');
const UserModel = require('../../../db/models/user.model');

const NotFoundError = require('../../../error/not-found');
const UnauthorizedError = require('../../../error/unauthorized');

const activate = function(req, callback) {
	const key = req.body.key;
	UserModel.findOne({ guid: key, isActive: false }, function(error, user) {
		if (error || !user) {
			callback.onSuccess({ error: 'User not found or already activated.' });
			return;
		}

		user.isActive = true;
		user.save(function(err) {
			const timeToLive = 60 * 60 * 24 * 365;

			const token = jwt.sign(
				{
					data: {
						id: user._id,
						isAdmin: user.isAdmin
					}
				},
				config.auth.secret,
				{ expiresIn: timeToLive }
			);

			var expirationDate = Math.floor(Date.now() / 1000) + timeToLive;

			callback.onSuccess({ token: token, expiration: expirationDate });
		});
	});
};

module.exports = activate;
