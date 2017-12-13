var Link = require('../../../db/models/link.model');

const upvote = function(req, callback) {
	const userId = callback.user ? callback.user.id : null;
	if (!userId) {
		return;
	}

	var query = Link.findOne({ isActive: true, _id: req.params.id });

	query.exec(function(err, data) {
		if (err || !data) {
			callback.onError(err);

			return;
		} else {
			const hasUpvoted = data.upvotes.some(upvote => {
				return upvote === userId 
			});

			if (!hasUpvoted) {
				data.upvotes.push(userId);
			} else {
				callback.onError();

				return;
			}
			
      data.save(function (err) {
				if (err) {
					callback.onError(err);

					return;
				}
				callback.onSuccess({});

				return;
			});
		}
	});
};

module.exports = upvote;
