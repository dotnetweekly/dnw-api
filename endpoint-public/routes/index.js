const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/links", require("./links"));
router.use("/categories", require("./categories"));
router.use("/user", require("./user"));
router.use("/newsletters", require("./newsletters"));
router.use("/tags", require("./tags"));

module.exports = router;
