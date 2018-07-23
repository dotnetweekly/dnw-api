const sanitize = require('mongo-sanitize');
const LinkModel = require("../../../db/models/link.model");
const UserModel = require("../../../db/models/user.model");
const ErrorHelper = require("../../../helpers/errors.helper");
const stringHelper = require("../../../helpers/string.helper");
const CalendarHelper = require('../../../helpers/calendar.helper');

const dbcategories = require("../../../data/categories");
const dbtags = require("../../../data/tags");

function tagsExistSearch(tags) {
  try {
    if (!tags || tags.length < 1 || tags.length > 5) {
      return false;
    }
    const tagNames = tags.filter(tag => {
      return dbtags.includes(tag);
    });
    return tags.length === tagNames.length;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function saveLink(newLink, user, errors, callback) {
  try {
    const link = new LinkModel({
      title: newLink.title,
      content: newLink.content,
      url: newLink.url,
      category: newLink.category,
      slug: stringHelper.slugify(newLink.title).slice(0, 99),
      tags: newLink.tags,
      isActive: user.isAdmin,
      user: user.id,
      upvotes: [],
      comments: [],
      createdOn: newLink.date || new Date(Date.now()),
      isPayed: false
    });
    link.save(function(err) {
      if (err || errors.length > 0) {
        callback.onSuccess({
          errors: errors.concat(ErrorHelper.formatErrors(err))
        });

        return;
      }
      callback.onSuccess({});

      return;
    });
  } catch (error) {
    console.log(error);
		callback.onError(error);
  }
}

const addLink = function(req, callback) {
  const errors = [];
  const newLink = sanitize(req.body);
  const newLinkCategory = newLink.category.slug || newLink.category;
  const category = dbcategories.filter(c => {
    return newLinkCategory === c.slug
  });
  const tagsExist = tagsExistSearch(newLink.tags);
  
  if(category.length === 0){
    errors.push({
      field: "category",
      error: `Category not found`
    });
  } else {
    newLink.category = category[0].slug;
    if (category !== "sponsored") {
      newLink.imageUrl = "";
    }
  }

  if (!tagsExist) {
    errors.push({
      field: "tags",
      error: `Between 1 and 5 tags`
    });
  }

  if ((newLink.category === "sponsored" || newLink.category === "job-listing")) {
    if (!newLink.date) {
      errors.push({
        field: "date",
        error: `Date not selected`
      });
    } else {
      newLink.createdOn = CalendarHelper.addDays(newLink.date, -3);
    }
    if (!newLink.title || newLink.title.length > 80) {
      errors.push({
        field: "title",
        error: `Max 80 characters`
      });
    }
    if (!newLink.content || newLink.content.length > 200) {
      errors.push({
        field: "content",
        error: `Max 200 characters`
      });
    }
  }
  
  if (errors.length > 0) {
    callback.onSuccess({ errors });
    return;
  }
  saveLink(newLink, callback.user, errors, callback);
};

module.exports = addLink;
