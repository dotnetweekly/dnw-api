const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/admin.comments.controller");
const commentsController = new CommentsController();

router.get("/:link", commentsController.search);
router.delete("/:link", commentsController.deleteItems);
router.post("/:link/:key", commentsController.updateItems);

module.exports = router;
