const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/admin.category.controller");
const categoryController = new CategoryController();

router.get("/", categoryController.getAll);
router.post("/isActive", categoryController.updateStatus);

module.exports = router;
