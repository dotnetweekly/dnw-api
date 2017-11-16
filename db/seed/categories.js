var mongoose = require("mongoose");
var Category = require("../models/category.model");
var categories = [];

categories.push(
  new Category({
    _id: new mongoose.Types.ObjectId(),
    name: "Articles",
    slug: "articles",
    isActive: true
  }),
  new Category({
    _id: new mongoose.Types.ObjectId(),
    name: "Books",
    slug: "books",
    isActive: true
  }),
  new Category({
    _id: new mongoose.Types.ObjectId(),
    name: "Events-Seminars",
    slug: "	events-seminars",
    isActive: true
  }),
  new Category({
    _id: new mongoose.Types.ObjectId(),
    name: "Libraries-Tools",
    slug: "libraries-tools",
    isActive: true
  }),
  new Category({
    _id: new mongoose.Types.ObjectId(),
    name: "Videos",
    slug: "videos",
    isActive: true
  })
);

module.exports = categories;
