var Link = require('../../../db/models/link.model');
var Newsletter = require('../../../db/models/newsletter.model');

const search = function(req, callback) {
	var query = Newsletter.find({ isActive: true }, [ 'week', 'year', 'createdOn' ]);

	query.exec(function(err, data) {
		if (err) {
			callback.onError([]);
			return;
		} else {
			callback.onSuccess(data);
		}
	});
};

module.exports = search;
