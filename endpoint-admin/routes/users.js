const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/admin.users.controller");
const usersController = new UsersController();

router.get("/", usersController.search);
router.delete("/", usersController.deleteItems);
router.post("/:key", usersController.updateItems);

module.exports = router;
