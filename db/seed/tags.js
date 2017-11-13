var mongoose = require("mongoose");
var Tag = require("../models/tag.model");
var tags = [];

tags.push(
  new Tag({
    _id: new mongoose.Types.ObjectId(),
    name: ".net",
    slug: "dotnet"
  }),
  new Tag({
    _id: new mongoose.Types.ObjectId(),
    name: ".net-core",
    slug: "dotnet-core"
  })
);

module.exports = tags;
