const sanitize = require('mongo-sanitize');
const User = require('../../../db/models/user.model');
const Link = require('../../../db/models/link.model');
const NotFoundError = require('../../../error/not-found');

async function getUserName(username) {
	try {
		const userLinkQuery = User.findOne({ username: username });
		return await userLinkQuery.exec();
	} catch (err) {
		console.log(err);
	}
}

const profile = async function(req, callback) {
	const page = sanitize(req.query) ? sanitize(req.query.page) || 1 : 1;
	const pageChunk = 12;

	const username = sanitize(req.params.username);
	const userObj = await getUserName(username);

	Link.count({
		user: userObj._id,
		isActive: true
	}, function( err, totalItems){

		const pages = Math.ceil(parseFloat(totalItems) / pageChunk);
		const skipItems = (page - 1) * pageChunk;

		var query = Link.find(
			{
				user: userObj._id,
				isActive: true
			},
			[]
		)
			.select([ 'title', 'slug', 'createdOn', 'category', 'tags' ])
			.populate('user', 'username')
			.limit(pageChunk)
			.skip(skipItems)
			.sort({ createdOn: -1 });
	
		query.exec(function(err, data) {
			if (err) {
				console.log(err);
				callback.onError({});
	
				return;
			} else {
				if (data) {
					callback.onSuccess({
						links: data,
						pages: pages,
						page: page
					});
	
					return;
				}
				callback.onError(new NotFoundError());
	
				return;
			}
		});
	})
};

module.exports = profile;
