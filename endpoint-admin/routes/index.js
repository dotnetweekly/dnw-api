const express = require("express");
const router = express.Router();

router.use("/links", require("./links"));
router.use("/categories", require("./categories"));
router.use("/auth", require("./auth"));

module.exports = router;
