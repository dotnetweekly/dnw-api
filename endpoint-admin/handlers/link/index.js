const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const getItem = require("./getItem");
const updateItem = require("./updateItem");
const newsletterClick = require("./newsletterClick");
const newsletterOpen = require("./newsletterOpen");
const newsletterSent = require("./newsletterSent");

class LinkHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.getItem = (req, callback) => getItem(req, callback);
    this.updateItem = (req, callback) => updateItem(req, callback);
    this.newsletterClick = (req, callback) => newsletterClick(req, callback);
    this.newsletterOpen = (req, callback) => newsletterOpen(req, callback);
    this.newsletterSent = (req, callback) => newsletterSent(req, callback);
  }
}

module.exports = LinkHandler;
