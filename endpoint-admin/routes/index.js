const express = require("express");
const router = express.Router();

router.use("/links", require("./links"));
router.use("/link", require("./link"));

router.use("/categories", require("./categories"));
router.use("/category", require("./category"));

router.use("/tags", require("./tags"));
router.use("/tag", require("./tag"));

router.use("/users", require("./users"));
router.use("/user", require("./user"));

router.use("/newsletters", require("./newsletters"));
router.use("/newsletter", require("./newsletter"));

router.use("/comments", require("./comments"));
router.use("/comment", require("./comment"));

router.use("/auth", require("./auth"));

module.exports = router;
