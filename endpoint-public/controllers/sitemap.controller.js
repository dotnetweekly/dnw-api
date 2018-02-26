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

  getSitemapWeeks(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (response) {
      this._sitemapHandler.getSitemapWeeks(req, response);
    }
  }

  getSitemapWeek(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (response) {
      this._sitemapHandler.getSitemapWeek(req, response);
    }
  }
}

module.exports = SitemapController;
