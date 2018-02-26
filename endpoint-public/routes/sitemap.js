const express = require("express");
const router = express.Router();

const SitemapController = require("../controllers/sitemap.controller");
const sitemapController = new SitemapController();

router.get("/", sitemapController.getSitemap);
router.get("/weeks", sitemapController.getSitemapWeeks);
router.get("/week/:year/:week", sitemapController.getSitemapWeek);

module.exports = router;
