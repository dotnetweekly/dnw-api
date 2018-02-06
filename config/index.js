module.exports = {
	auth: {
		secret: process.env.SECRET || 'secret'
	},
	database: {
		local: process.env.DB_CONNECTION ? process.env.DB_CONNECTION.toString() : 'mongodb://127.0.0.1:27017/dnwdb'
	},
	newsletterDomain: process.env.NEWSLETTER_DOMAIN || 'http://localhost:6100/',
	apiDomain: process.env.DOMAIN_API || 'http://localhost:3000/api/v1/',
	clientDomain: process.env.CLIENT_DOMAIN || 'http://localhost:5000/'
};
