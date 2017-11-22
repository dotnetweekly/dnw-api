const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/admin.comments.controller");
const commentsController = new CommentsController();

router.get("/", commentsController.search);
router.delete("/", commentsController.deleteItems);
router.post("/:key", commentsController.updateItems);

module.exports = router;
