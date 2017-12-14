const User = require('../../../db/models/user.model');
const NotFoundError = require('../../../error/not-found');

const profile = function(callback) {
	var query = User.findOne({ _id: callback.user.id, isActive: true }, [
		'firstName',
		'lastName',
		'username',
		'subscribed',
		'twitter',
		'github'
	]);
	
	query
		.populate('category', [ 'name', 'slug' ])
		.populate('tags')
		.populate('user', 'username')
		.sort({ title: 'desc' });

	query.exec(function(err, data) {
		if (err) {
			callback.onError({});

			return;
		} else {
			if (data) {
				callback.onSuccess(data);

				return;
			}
			callback.onError(new NotFoundError());
				
			return;
		}
	});
};

module.exports = profile;
