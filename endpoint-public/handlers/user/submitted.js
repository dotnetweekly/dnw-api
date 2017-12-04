const User = require('../../../db/models/user.model');
const Link = require('../../../db/models/link.model');
const NotFoundError = require('../../../error/not-found');

const profile = function(req, callback) {
	const page = req.query ? req.query.page || 1 : 1;
	const pageChunk = 12;

	var query = Link.find(
		{
			user: callback.user.id
		},
		[]
	)
		.select([ 'title', 'slug', 'createdOn' ])
		.populate('category', [ 'name', 'slug' ])
		.populate('tags')
		.populate('user', 'username')
		.sort({ createdOn: -1 });

	query.exec(function(err, data) {
		if (err) {
			callback.onError({});
			return;
		} else {
			let count = 0;
			const pages = Math.ceil(parseFloat(data.length) / pageChunk);
			data = data.filter((item) => {
				count++;
				if (count >= (page - 1) * pageChunk && count < (page - 1) * pageChunk + pageChunk) {
					return item;
				}
			});

			if (data) {
				callback.onSuccess({
					links: data,
					pages: pages,
					page: page
				});
				return;
			}
			callback.onError(new NotFoundError());
		}
	});
};

module.exports = profile;
