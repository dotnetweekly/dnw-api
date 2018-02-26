const express = require("express");
const router = express.Router();

const SitemapController = require("../controllers/sitemap.controller");
const sitemapController = new SitemapController();

router.get("/", sitemapController.getSitemap);

module.exports = router;
