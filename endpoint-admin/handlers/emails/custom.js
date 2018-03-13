const axios = require('axios');
const sanitize = require('mongo-sanitize');

const Link = require('../../../db/models/link.model');
const CalendarHelper = require('../../../helpers/calendar.helper');
const User = require('../../../db/models/user.model');
const config = require('../../../config');

const EmailModal = require('../../../email');
const ErrorHelper = require('../../../helpers/errors.helper');
const EmailHelper = require('../../../helpers/email.helper');

const emailSender = new EmailModal();
const intervalToSend = 500;

function sendEmailInChunks(alreadySentTo, take, html, params, callback, onlyAdmin) {
	return new Promise((resolve, reject) => {
		var query = User.find({ isActive: true, subscribed: true }, [
			'keyUnsubscribe',
			'username',
			'resetPassword',
			'firstName',
			'email',
			'_id'
		])
			.limit(take)
			.skip(alreadySentTo);

		if (onlyAdmin || onlyAdmin === undefined) {
			query = User.find({ isAdmin: true });
		}

		var promises = [];
		query.exec(function(err, users) {
			if (err) {
				callback.onError([]);
				return;
			} else {
				const userSubstitutions = [];
				for (var i = 0; i < users.length; i++) {
					const user = users[i];
					if (user && user.email) {
						userSubstitutions.push(EmailHelper.replaceVars(user));
					}
				}
				emailSender.send(userSubstitutions, params.subject, html, '');
				resolve();
			}
		});
	});
}

const sendEmailToUsers = async function(html, params, callback, onlyAdmin) {
	let count = 0;
	let alreadySentTo = 0;
	var query = { isActive: true, subscribed: true };
	if (onlyAdmin || onlyAdmin === undefined) {
		query = { isAdmin: true };
	}

	User.count(query).exec(function(err, total) {
		const loops = Math.ceil(total / intervalToSend); // 3467
		if (loops > 0 && loops < 10) {
			for (var loop = 0; loop < loops; loop++) {
				let take = intervalToSend;
				if (alreadySentTo + intervalToSend > total) {
					take = total - alreadySentTo;
				}
				sendEmailInChunks(alreadySentTo, take, html, params, callback, onlyAdmin).then(() => {
					count += intervalToSend;
					if (count >= total) {
						callback.onSuccess({ usersCount: total });
					}
				});
				alreadySentTo += intervalToSend;
			}
		}
	});
};

const sendCustom = function(req, callback) {
	const onlyAdmin = req.query.onlyAdmin ? sanitize(req.query.onlyAdmin) : false;

	axios.get(`${config.newsletterDomain}api/v1/email/template`, { params: req.body }).then(response => {
		sendEmailToUsers(response.data.data, req.body, callback, onlyAdmin);
	});
};

module.exports = sendCustom;
