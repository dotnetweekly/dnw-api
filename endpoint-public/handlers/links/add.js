const LinkModel = require("../../../db/models/link.model");
const CategoryModel = require("../../../db/models/category.model");
const TagsModel = require("../../../db/models/tag.model");
const UserModel = require("../../../db/models/user.model");
const ErrorHelper = require("../../../helpers/errors.helper");
const stringHelper = require("../../../helpers/string.helper");

async function categoryExists(category) {
  if (!category) {
    return false;
  }

  try {
    const query = CategoryModel.findOne({ name: category.name });
    const existingCategory = await query.exec();

    return !!existingCategory;
  } catch (error) {
    return false;
  }
}

async function tagsExist(tags) {
  if (!tags || tags.length === 0) {
    return false;
  }
  const tagNames = tags.map(tag => {
    return tag.name;
  });

  try {
    const query = TagsModel.find({ name: { $in: tagNames } });
    const existingTags = await query.exec();

    return existingTags.length === tagNames.length;
  } catch (error) {
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
      isActive: false,
      user: user.id,
      upvotes: [],
      comments: []
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
  } catch (ex) {
    console.log(ex);
  }
}

const addLink = function(req, callback) {
  const errors = [];
  const newLink = req.body;
  categoryExists(newLink.category).then(categoryExist => {
    if (!categoryExist) {
      errors.push({
        field: "category",
        error: `Category not found`
      });
    }
    tagsExist(newLink.tags).then(tagsExist => {
      if (!tagsExist) {
        errors.push({
          field: "tags",
          error: `Tags not found`
        });
      }
      saveLink(newLink, callback.user, errors, callback);
    });
  });
};

module.exports = addLink;
