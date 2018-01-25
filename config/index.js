const newsletterDomain = process.env.NEWSLETTER_DOMAIN || 'http://localhost:6100/';

module.exports = {
	auth: {
		secret: 'secret'
	},
	database: {
		local: process.env.DB_CONNECTION || 'mongodb://127.0.0.1:27017/dnwdb'
	},
	newsletterDomain: newsletterDomain
};
