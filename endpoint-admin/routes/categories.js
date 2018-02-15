const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/admin.categories.controller");
const categoryController = new CategoryController();

router.get("/", categoryController.search);

module.exports = router;
