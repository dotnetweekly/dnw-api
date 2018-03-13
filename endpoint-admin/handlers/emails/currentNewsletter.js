const axios = require('axios');
const sanitize = require('mongo-sanitize');

const config = require('../../../config');
const Link = require('../../../db/models/link.model');
const CalendarHelper = require('../../../helpers/calendar.helper');

const currentNewsletter = function(req, callback) {
	const save = sanitize(req.body.save);
	let week = sanitize(req.query.week);
	let year = sanitize(req.query.year);
	const category = sanitize(req.query.category);
	const now = CalendarHelper.getUtcNow();

	if (!week || !year) {
		week = parseInt(CalendarHelper.getWeek(now)) - 1;
		year = now.getFullYear();
	} else {
		week = parseInt(week) - 1;
	}

	var searchParams = { isActive: true };

	const dateRange = CalendarHelper.getDateRangeOfWeek(week, year);
	searchParams.createdOn = { $gte: dateRange.from, $lte: dateRange.to };

	var query = Link.find(searchParams, ['title', 'url', 'createdOn', 'slug', 'upvotes', 'tags', 'category']);
	query.populate('user', 'username').sort({ title: 'desc' });

	query.exec(function(err, data) {
		if (err) {
			callback.onError([]);
			return;
		} else {
			if (category) {
				data = data.filter(link => {
					if (!category || (link.category && link.category.slug === category)) {
						return link;
					}
				});
			}

			data = data.sort(function(a, b) {
				return b.upvotes.length - a.upvotes.length;
			});

			axios.defaults.headers.common['Authorization'] = sanitize(req.headers.authorization);

			axios
				.post(`${config.newsletterDomain}api/v1/newsletters/current`, {
					links: data,
					week,
					year,
					save
				})
				.then(response => {
					callback.onSuccess(response.data.data);
				})
				.catch(error => {
					callback.onError(error);
				});
		}
	});
};

module.exports = currentNewsletter;
