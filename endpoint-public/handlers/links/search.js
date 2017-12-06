var Link = require('../../../db/models/link.model');
var Category = require('../../../db/models/category.model');
var CalendarHelper = require('../../../helpers/calendar.helper');

const search = function(req, callback) {
	let week = req.query.week;
	let year = req.query.year;
	const category = req.query.category;
	const now = new Date(Date.now());

	if (!week || !year) {
		week = CalendarHelper.getWeek(now);
		year = now.getFullYear();
	}

	var searchParams = { isActive: true };

	const dateRange = CalendarHelper.getDateRangeOfWeek(week, year);
	searchParams.createdOn = { $gte: dateRange.from, $lte: dateRange.to };

	var query = Link.find(searchParams, [ 'title', 'url', 'createdOn', 'slug', 'upvotes' ]);
	query
		.populate('category', [ 'name', 'slug' ])
		.populate('tags')
		.populate('user', 'username')
		.sort({ title: 'desc' });

	query.exec(function(err, data) {
		if (err) {
			callback.onError([]);
			return;
		} else {
			if (category) {
				data = data.filter((link) => {
					if (!category || (link.category && link.category.slug === category)) {
						return link;
					}
				});
			}

			const returnData = {
				links: data
			};
			callback.onSuccess(returnData);
		}
	});
};

module.exports = search;
