const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const Schema = mongoose.Schema;
const Link = require('../../../db/models/link.model');
const CalendarHelper = require('../../../helpers/calendar.helper');

const updateItem = function(req, callback) {
	const itemToUpdate = sanitize(req.body);

	if (!itemToUpdate._id) {
		itemToUpdate._id = mongoose.Types.ObjectId();
		itemToUpdate.createdOn = CalendarHelper.getUtcNow();
	}

	const updatePromise = new Promise((resolve, reject) => {
		const idOptions = { _id: itemToUpdate._id };

		const updatedProperties = {};
		for (var prop in itemToUpdate) {
			if (prop === 'category') {
				updatedProperties[prop] = itemToUpdate[prop].slug;
			} else {
				updatedProperties[prop] = itemToUpdate[prop];
			}
		}

		Link.update(idOptions, { $set: updatedProperties }, { upsert: true }, function(err) {
			if (err) {
				console.log(err);
				reject(err);
			}
			resolve();
		});
	});

	updatePromise
		.then(function() {
			callback.onSuccess();
		})
		.catch(function(err) {
			callback.onError(err);
			return;
		});
};

module.exports = updateItem;
