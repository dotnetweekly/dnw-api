var Link = require('../../../db/models/link.model');
var Category = require('../../../db/models/category.model');
var CalendarHelper = require('../../../helpers/calendar.helper');
var config = require('../../../config');
var axios = require('axios');

const currentNewsletter = function(req, callback) {
	let week = req.query.week;
	let year = req.query.year;
	const category = req.query.category;
	const now = new Date(Date.now());

	if (!week || !year) {
		week = CalendarHelper.getWeek(now) - 1;
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

			axios.defaults.headers.common['Authorization'] = req.headers.authorization;

			axios
				.post(`${config.newsletterDomain}api/v1/newsletters/current`, {
					links: data
				})
				.then((response) => {
					callback.onSuccess(response.data.data);
				})
				.catch((error) => {
					callback.onError(error);
				});
		}
	});
};

module.exports = currentNewsletter;
