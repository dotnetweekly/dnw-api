const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/links", require("./links"));
router.use("/categories", require("./categories"));
router.use("/user", require("./user"));
router.use("/newsletters", require("./newsletters"));
router.use("/tags", require("./tags"));
router.use("/sitemap", require("./sitemap"));
router.use("/emails", require("./emails"));

module.exports = router;
