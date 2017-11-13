var mongoose = require("mongoose");
var Category = require("../category.model");
var categories = [];

categories.push(
  new Category({
    _id: new mongoose.Types.ObjectId(),
    name: "Articles",
    slug: "articles"
  }),
  new Category({
    _id: new mongoose.Types.ObjectId(),
    name: "Books",
    slug: "books"
  }),
  new Category({
    _id: new mongoose.Types.ObjectId(),
    name: "Events-Seminars",
    slug: "	events-seminars"
  }),
  new Category({
    _id: new mongoose.Types.ObjectId(),
    name: "Libraries-Tools",
    slug: "libraries-tools"
  }),
  new Category({
    _id: new mongoose.Types.ObjectId(),
    name: "Videos",
    slug: "videos"
  })
);

module.exports = categories;
