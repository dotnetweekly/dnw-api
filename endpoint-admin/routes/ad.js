const express = require("express");
const router = express.Router();

const AdController = require("../controllers/admin.ad.controller");
const adController = new AdController();

router.get("/:id?", adController.get);
router.post("/:id?", adController.update);

module.exports = router;
