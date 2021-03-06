const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/admin.category.controller");
const categoryController = new CategoryController();

router.get("/:id?", categoryController.get);
router.post("/:id?", categoryController.update);

module.exports = router;
