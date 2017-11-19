const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/admin.categories.controller");
const categoryController = new CategoryController();

router.get("/", categoryController.search);
router.delete("/", categoryController.deleteCategories);
router.post("/:key", categoryController.update);

module.exports = router;
