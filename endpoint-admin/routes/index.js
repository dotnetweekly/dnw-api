const express = require("express");
const router = express.Router();

router.use("/links", require("./links"));
router.use("/auth", require("./auth"));

module.exports = router;
