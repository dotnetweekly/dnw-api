const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const getItem = require("./getItem");
const updateItem = require("./updateItem");
const getSingleComment = require("./getSingleComment");

class CommentHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.getItem = (req, callback) => getItem(req, callback);
    this.updateItem = (req, callback) => updateItem(req, callback);
    this.getSingleComment = (req, callback) => getSingleComment(req, callback);
  }
}

module.exports = CommentHandler;
