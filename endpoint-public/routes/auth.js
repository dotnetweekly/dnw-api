const express = require("express");
const Recaptcha = require('express-recaptcha');
const router = express.Router();

const Controller = require("../controllers/auth.controller");
const controller = new Controller();

const recaptcha = new Recaptcha(process.env.RECAPTCHA_PUBLIC, process.env.RECAPTCHA_SECRET);

router.post("/register", recaptcha.middleware.verify, controller.register);
router.post("/activate", recaptcha.middleware.verify, controller.activate);
router.post("/login", recaptcha.middleware.verify, controller.login);
router.post("/forgotPassword/:key", recaptcha.middleware.verify, controller.forgotPasswordActivate);

module.exports = router;
