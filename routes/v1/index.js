const express = require("express");
const router = express.Router();

router.use("/admin", require("./admin"));
router.use("/", require("./public"));

module.exports = router;
