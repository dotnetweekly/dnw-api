const jwt = require('jsonwebtoken');
const Guid = require('guid');
const axios = require("axios");
const sanitize = require('mongo-sanitize');

const config = require('../../../config');
const User = require('../../../db/models/user.model');
const NotFoundError = require('../../../error/not-found');
const UnauthorizedError = require('../../../error/unauthorized');
const EmailModal = require("../../../email");
const ErrorHelper = require("../../../helpers/errors.helper");

const emailSender = new EmailModal();

const returnError = function(req, callback, errors) {
	callback.onSuccess({ errors });
};

const createAccount = function(user, callback) {
	const credentialName = {
		$and: [ { $or: [ { username: user.username }, { email: user.email } ] }, { $or: [ { isActive: false } ] } ]
	};

	User.remove(credentialName, () => {
		var pendingUser = new User({
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			password: user.password,
			email: user.email,
			isActive: false,
			guid: Guid.create(),
			resetEmail: Guid.create(),
			resetPassword: Guid.create()
		});

		pendingUser.save(function(err) {
			
			if(err){
				callback.onSuccess({ errors: ErrorHelper.formatErrors(err) });
				
				return;
			}

			sendEmail(pendingUser.email, pendingUser.guid, callback);
		});
	});
};

const sendEmail = function(email, token, callback) {
	return new Promise((resolve, reject) => {
		axios
		.get(`${config.newsletterDomain}api/v1/user/activate?token=${token}`)
		.then((response) => {
			emailSender.send([email], "[Call to action] Activate your account", response.data.data)
			.then(() => {
				callback.onSuccess({});
				resolve();
			}).catch(error => {
				callback.onError(error);
				reject();
			});
		})
		.catch((error) => {
			callback.onError(error);
			reject();
		});
	})
}

const register = function(req, callback) {
	const requiredFields = [ 'firstName', 'username', 'email', 'password' ];
	const errors = [];

	const newUser = sanitize(req.body.user);

	for (var i = 0; i < requiredFields.length; i++) {
		const requiredField = requiredFields[i];
		if (!newUser[requiredField]) {
			errors.push({
				field: requiredField,
				error: `${requiredField} is a required field`
			});
		}
	}

	if (errors.length > 0) {
		returnError(req, callback, errors);
		return;
	}

	const username = newUser.username;
	const password = newUser.password;

	const credentialName = {
		$and: [ { $or: [ { username: newUser.username }, { email: newUser.email } ] }, { $or: [ { isActive: true } ] } ]
	};

	User.find(credentialName, function(error, users) {
		if (users.length > 0) {
			const usernameExists = users.find((user) => {
				return user.username === newUser.username;
			});

			const emailExists = users.find((user) => {
				return user.email === newUser.email;
			});

			if (usernameExists) {
				errors.push({
					field: 'username',
					error: 'username already exists'
				});
			}

			if (emailExists) {
				errors.push({
					field: 'email',
					error: 'email already exists'
				});
			}
		}

		if (errors.length > 0) {
			returnError(req, callback, errors);

			return;
		}

		createAccount(newUser, callback);
	});
};

module.exports = register;
