const sanitize = require('mongo-sanitize');
var Link = require('../../../db/models/link.model');

const downvote = function(req, callback) {
	try{
		const userId = callback.user ? callback.user.id : null;
		if (!userId) {
			callback.onError("User not logged in");
		}
	
		var query = Link.findOne({ isActive: true, _id: sanitize(req.params.id) });
	
		query.exec(function(err, data) {
			if (err || !data) {
				callback.onError(err);
	
				return;
			} else {
				var index = data.upvotes.indexOf(userId);
				if (index > -1) {
					data.upvotes.splice(index, 1);
				} else {
					callback.onError("You have to upvote first");
					
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

module.exports = downvote;
