const jwt = require('jsonwebtoken');
const Guid = require('guid');
const axios = require('axios');
const sanitize = require('mongo-sanitize');

const config = require('../../../config');
const User = require('../../../db/models/user.model');

const EmailModal = require('../../../email');
const ErrorHelper = require('../../../helpers/errors.helper');
const EmailHelper = require('../../../helpers/email.helper');

const emailSender = new EmailModal();

const sendForgotPasswordEmail = function(user, token, callback) {
	return new Promise((resolve, reject) => {
		axios
			.get(`${config.newsletterDomain}api/v1/user/forgotPassword?token=${token}`)
			.then(response => {
				const userSubstitutions = [];
				userSubstitutions.push(EmailHelper.replaceVars(user));
				emailSender.send(userSubstitutions, 'Reset password request', response.data.data);
				resolve();
			})
			.catch(error => {
				console.log(error);
				reject(error);
			});
	});
};

const forgotPassword = function(req, callback) {
	const email = sanitize(req.body.email);
	var query = User.findOne({ email: email, isActive: true });

	query.exec(function(err, currentUser) {
		if (err || !currentUser) {
			callback.onSuccess({
				errors: [{ field: 'email', error: 'User not found or is deactivated.' }]
			});
		} else {
			currentUser.resetPassword = Guid.raw();
			currentUser.save(function(error) {
				if (!error) {
					sendForgotPasswordEmail(currentUser, currentUser.resetPassword, callback).then(() => {
						callback.onSuccess({});

						return;
					});
				} else {
					callback.onSuccess({
						errors: [
							{
								field: 'email',
								error:
									"We couldn't send the forgot password request. Either register first or contact info@dotnetweekly.com."
							}
						]
					});
				}
			});
		}
	});
};

module.exports = forgotPassword;
