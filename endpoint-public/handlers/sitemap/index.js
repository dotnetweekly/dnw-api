const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const getSitemap = require("./getSitemap");
const getSitemapWeeks = require("./getSitemapWeeks");
const getSitemapWeek = require("./getSitemapWeek");

class SitemapHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.getSitemap = (req, callback) => getSitemap(req, callback);
    this.getSitemapWeeks = (req, callback) => getSitemapWeeks(req, callback);
    this.getSitemapWeek = (req, callback) => getSitemapWeek(req, callback);
  }
}

module.exports = SitemapHandler;
