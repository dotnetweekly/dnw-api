const config = require('../config');

const emailHelper = {
	replaceVars: function(user) {
		// let newHtml = html;

		// newHtml = newHtml.replace(/(\${USER_UNSUBSCRIBE})/gim, `${config.clientDomain}unsubscribe/${user.keyUnsubscribe}`);
		// newHtml = newHtml.replace(/(\${USER_USERNAME})/gim, user.username);
		// newHtml = newHtml.replace(/(\${USER_RESET})/gim, `${config.clientDomain}forgot-password/${user.resetPassword}`);
		// newHtml = newHtml.replace(/(\${USER_FISTNAME})/gim, user.firstName);
		// newHtml = newHtml.replace(/(\$DOMAIN_CLIENT)/gim, config.clientDomain);

		return {
			address: {
				email: user.email
			},
			substitution_data: {
				USER_USERNAME: user.username,
				USER_FISTNAME: user.firstName,
				USER_RESET: `${config.clientDomain}forgot-password/${user.resetPassword}`,
				USER_UNSUBSCRIBE: `${config.clientDomain}unsubscribe/${user.keyUnsubscribe}`,
				DOMAIN_CLIENT: config.clientDomain
			}
		};
	}
};

module.exports = emailHelper;
