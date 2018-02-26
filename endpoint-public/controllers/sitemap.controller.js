const BaseController = require("./base.controller");
const SitemapHandler = require("../handlers/sitemap");

class SitemapController extends BaseController {
  constructor() {
    super();
    this._sitemapHandler = new SitemapHandler();
  }

  getSitemap(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (response) {
      this._sitemapHandler.getSitemap(req, response);
    }
  }
}

module.exports = SitemapController;
