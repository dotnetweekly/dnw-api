const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/admin.comment.controller");
const commentController = new CommentController();

router.get("/:link/:id?", commentController.getItem);
router.post("/:link/:id?", commentController.updateItem);

module.exports = router;
