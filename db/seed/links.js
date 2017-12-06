var Promise = require('es6-promise').Promise;
const mongoose = require('mongoose');
const path = require('path');
const db = require('../connect');

const LinkModel = require('../models/link.model');
const UserModel = require('../models/user.model');
const CategoryModel = require('../models/category.model');
const TagModel = require('../models/tag.model');

const links = require('../../../ext-data/links');
const newUserData = require('../../../ext-data/user');

async function getUser(user) {
	try {
		const userLinkQuery = UserModel.findOne({ email: user.email });
		return await userLinkQuery.exec();
	} catch (err) {
		console.log(err);
	}
}

async function getLink(oldLink) {
	const currentLinkQuery = LinkModel.findOne({ slug: oldLink.slug });
	return await currentLinkQuery.exec();
}

async function getTag(item) {
	const currentQuery = TagModel.findOne({ slug: item.slug });
	return await currentQuery.exec();
}

async function getCategory(item) {
	const currentQuery = CategoryModel.findOne({ slug: item.slug });
	return await currentQuery.exec();
}

async function getNewUser() {
	newUserData._id = new mongoose.Types.ObjectId();
	var newModel = new UserModel(newUserData);
	return await newModel.save();
}

async function addTag(item) {
	item._id = new mongoose.Types.ObjectId();
	var newModel = new TagModel(item);
	return await newModel.save();
}

async function addCategory(item) {
	item._id = new mongoose.Types.ObjectId();
	var newModel = new CategoryModel(item);
	return await newModel.save();
}

async function addLink(item) {
	item._id = new mongoose.Types.ObjectId();
	var newModel = new LinkModel(item);
	return await newModel.save();
}

async function saveLink(link) {
	return await link.save();
}

async function addData() {
	let currentUser = await getUser(newUserData);

	if (!currentUser) {
		currentUser = await getNewUser();
	}

	for (var i in links) {
		const oldLink = links[i];
		let currentLink = await getLink(oldLink);
		if (currentLink) {
			if (new Date(currentLink.createdOn).getDay() == 1 || new Date(currentLink.createdOn).getDay() == 2) {
				currentLink.createdOn.setDate(new Date(currentLink.createdOn).getDate() - 3);
			}
			await saveLink(currentLink);
			continue;
		}

		const newLink = {};

		newLink._id = new mongoose.Types.ObjectId();
		newLink.title = oldLink.title || '';
		newLink.content = oldLink.content || '';
		newLink.slug = oldLink.slug;
		newLink.url = oldLink.url;
		newLink.createdOn = new Date(oldLink.createdOn);
		newLink.comments = [];
		newLink.tags = [];
		newLink.upvotes = [];
		newLink.user = currentUser;

		if (newLink.createdOn.getDay() == 1 || newLink.createdOn.getDay() == 2) {
			newLink.createdOn.setDate(newLink.createdOn.getDate() - 3);
		}

		for (tagKey in oldLink.tags) {
			const oldTag = oldLink.tags[tagKey];
			let currentTag = await getTag(oldTag);

			if (!currentTag) {
				currentTag = {
					_id: new mongoose.Types.ObjectId(),
					name: oldTag.name,
					slug: oldTag.slug,
					isActive: true,
					user: currentUser
				};

				currentTag = await addTag(currentTag);
				newLink.tags.push(currentTag);
			} else {
				newLink.tags.push(currentTag);
			}
		}

		const oldCategory = oldLink.category;

		if (oldCategory) {
			if (oldCategory && oldCategory.slug == 'events-seminars') {
				oldCategory.slug = 'events-training';
				oldCategory.name = 'Events-Training';
			}

			let currentCategory = await getCategory(oldCategory);

			if (!currentCategory) {
				currentCategory = {
					_id: new mongoose.Types.ObjectId(),
					name: oldCategory.name,
					slug: oldCategory.slug,
					isActive: true,
					user: currentUser
				};

				currentCategory = await addCategory(currentCategory);
				newLink.category = currentCategory;
			} else {
				newLink.category = currentCategory;
			}
		}

		await addLink(newLink);
	}
}

addData();

module.exports = '';
