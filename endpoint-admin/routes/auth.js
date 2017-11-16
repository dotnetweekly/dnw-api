const express = require("express");
const router = express.Router();

const Controller = require("../controllers/admin.auth.controller");
const controller = new Controller();

router.post("/login", controller.login);

module.exports = router;
