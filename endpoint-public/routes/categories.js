const express = require("express");
const router = express.Router();

const CategoriesController = require("../controllers/categories.controller");
const categoriesController = new CategoriesController();

router.get("/", categoriesController.getCategories);

module.exports = router;
