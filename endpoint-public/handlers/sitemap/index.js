const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const getSitemap = require("./getSitemap");

class SitemapHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.getSitemap = (req, callback) => getSitemap(req, callback);
  }
}

module.exports = SitemapHandler;
