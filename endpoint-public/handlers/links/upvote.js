const sanitize = require('mongo-sanitize');
var Link = require('../../../db/models/link.model');

const upvote = function(req, callback) {
	try{
		const userId = callback.user ? callback.user.id : null;
		if (!userId) {
			return;
		}

		var query = Link.findOne({ isActive: true, _id: sanitize(req.params.id) });

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
	} catch(error) {
		console.log(error);
		callback.onError(error);
	}
};

module.exports = upvote;
