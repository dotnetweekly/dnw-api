const express = require("express");
const router = express.Router();

const Controller = require("../../controllers/user.controller");
const userController = new Controller();

router.get("/profile", userController.profile);

module.exports = router;
