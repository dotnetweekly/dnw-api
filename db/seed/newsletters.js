var Promise = require('es6-promise').Promise;
const mongoose = require('mongoose');
const path = require('path');
const db = require('../connect');

const NewsletterModel = require('../models/newsletter.model');
const newsletters = require('../../../ext-data/newsletters');

async function getItem(oldItem) {
	const currentQuery = NewsletterModel.findOne({ week: oldItem.week, year: oldItem.year });
	return await currentQuery.exec();
}

async function addItem(item) {
	item._id = new mongoose.Types.ObjectId();
	var newModel = new NewsletterModel(item);
	return await newModel.save();
}

async function addData() {
	for (var i in newsletters) {
		const oldItem = newsletters[i];
		let currentLink = await getItem(oldItem);
		if (currentLink) {
			continue;
		}

		const newNewsletter = {};

		newNewsletter._id = new mongoose.Types.ObjectId();
		newNewsletter.week = oldItem.week;
		newNewsletter.year = oldItem.year;
		newNewsletter.createdOn = new Date(oldItem.createdOn);
		newNewsletter.isActive = oldItem.isActive;

		await addItem(newNewsletter);
	}
}

addData();

module.exports = '';
