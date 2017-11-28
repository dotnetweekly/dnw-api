var mongoose = require("mongoose");
var path = require("path");

var db = require("../connect");
var LinkModel = require("../models/link.model");
var UserModel = require("../models/user.model");
var CategoryModel = require("../models/category.model");

var categories = require("./categories");
var tags = require("./tags");
var users = require("./users");

UserModel.collection.insert(users, function (error) {
  console.log(error);
});
CategoryModel.collection.insert(categories, function (error) {
  console.log(error);
});

var link = new LinkModel({
  title: "C# scripting in Excel",
  content:
    "Being a modern language with access to a rich ecosystem of libraries, C# can be immensely helpful both for automation and data processing in Excel. The goal of QueryStorm in this regard is to make C# easily available in Excel in order to help developers, db professionals and data scientists make better use of Excel. The C# scripting engine in QueryStorm is powered by the Roslyn compiler.",
  slug: "csharp-scripting-excel",
  url: "http://querystorm.com/documentation.html",
  image: "",
  upvotes: 1,
  category: categories[0],
  tags: [tags[0], tags[1]],
  user: users[0],
  comments: []
});

link.save().catch(function (error) {
  console.log(error);
});
