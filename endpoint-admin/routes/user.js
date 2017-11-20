const express = require("express");
const router = express.Router();

const UserController = require("../controllers/admin.user.controller");
const usercontroller = new UserController();

router.get("/:id?", usercontroller.getItem);
router.post("/:id?", usercontroller.updateItem);

module.exports = router;
