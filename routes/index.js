var express = require('express');
var router = express.Router();
var linkCtrl = require('../controllers/links.controller');

router.get('/links', function(req, res) {
  return linkCtrl.list(req, res);
});

module.exports = router;
