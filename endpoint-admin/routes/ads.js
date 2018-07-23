const express = require("express");
const router = express.Router();

const AdsController = require("../controllers/admin.ads.controller");
const adsController = new AdsController();

router.get("/", adsController.search);

module.exports = router;
