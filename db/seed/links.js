var Promise = require("es6-promise").Promise;
const mongoose = require("mongoose");
const path = require("path");
const db = require("../connect");

const LinkModel = require("../models/link.model");
const UserModel = require("../models/user.model");

const links = require("../../../ext-data/links");
const newUserData = require("../../../ext-data/user");

const categories = require("../../data/categories");
const tags = require("../../data/tags");
const tagObj = {};

async function getUser(user) {
  try {
    const userLinkQuery = UserModel.findOne({ email: user.email });
    return await userLinkQuery.exec();
  } catch (err) {
    console.log(err);
  }
}

async function getLink(oldLink) {
  try {
    const currentLinkQuery = LinkModel.findOne({ slug: oldLink.slug });
    return await currentLinkQuery.exec();
  } catch (error) {
    return;
  }
}

async function getNewUser() {
  try {
    newUserData._id = new mongoose.Types.ObjectId();
    var newModel = new UserModel(newUserData);
    return await newModel.save();
  } catch (error) {
    return;
  }
}

async function addLink(item) {
  try {
    item._id = new mongoose.Types.ObjectId();
    var newModel = new LinkModel(item);
    return await newModel.save();
  } catch (error) {
    return;
  }
}

async function saveLink(link) {
  try {
    return await link.save();
  } catch (error) {
    return;
  }
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
      if (
        new Date(currentLink.createdOn).getDay() == 1 ||
        new Date(currentLink.createdOn).getDay() == 2
      ) {
        currentLink.createdOn.setDate(
          new Date(currentLink.createdOn).getDate() - 3
        );
      }
      try {
        await saveLink(currentLink);
      } catch (err) {}
      continue;
    }

    const newLink = {};

    let newLinkSlug = oldLink.slug;
    if (newLinkSlug.length > 0) {
      newLinkSlug = newLinkSlug.slice(0, 99);
    }

    newLink._id = new mongoose.Types.ObjectId();
    newLink.title = oldLink.title || "";
    newLink.content = oldLink.content || "";
    newLink.slug = newLinkSlug;
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
      const newTag = oldTag.name.split(' ').join('-').replace(/\'/, "");
      newLink.tags.push(newTag);
      tagObj[newTag] = "";
    }

    const oldCategory = oldLink.category;

    if (oldCategory) {
      if (oldCategory && oldCategory.slug == "events-seminars") {
        oldCategory.slug = "events-training";
        oldCategory.name = "Events-Training";
      }

      let currentCategory = categories.filter(category => {
        return category.slug == oldCategory.slug
      })

      if (currentCategory.length === 0) {
        newLink.category = categories[0].slug;
      } else {
        newLink.category = currentCategory[0].slug;
      }
    }

    await addLink(newLink);
  }
}

addData();

module.exports = "";
