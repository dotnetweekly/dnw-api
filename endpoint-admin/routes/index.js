const express = require("express");
const router = express.Router();

router.use("/links", require("./links"));
router.use("/categories", require("./categories"));
router.use("/category", require("./category"));

router.use("/tags", require("./tags"));
router.use("/tag", require("./tag"));

router.use("/users", require("./users"));
router.use("/user", require("./user"));

router.use("/auth", require("./auth"));

module.exports = router;
