const express = require("express");
const router = express.Router();

// router.use("/auth", require("./auth"));
router.use("/links", require("./links"));

module.exports = router;
