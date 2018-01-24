var Link = require('../../../db/models/link.model');

const getSingle = function(req, callback) {
	const userId = callback.user ? callback.user.id : null;

	var query = Link.findOne({ isActive: true, slug: req.params.id }, [
		'_id',
		'title',
		'url',
		'content',
		'createdOn',
		'slug',
		'upvotes',
		'createdOn'
	]);

	query
		.populate('category', [ 'slug', 'name' ])
		.populate('tags')
		.populate({ path: 'comments.user', select: 'username' })
		.populate({ path: 'comments', select: 'content' })
		.populate('user', 'username');

	query.exec(function(err, data) {
		if (err) {
			callback.onError();

			return;
		} else {
			if(data){

				let link = data._doc;

				link.upvoteCount = link.upvotes.length;
				link.hasUpvoted = link.upvotes.some(upvote => {
					return !userId ? false : upvote.trim() == userId.trim() 
				});
				link.upvotes = [];

				callback.onSuccess(link);

				return;
			}

			callback.onError("No link found");

			return;
		}
	});
};

module.exports = getSingle;
