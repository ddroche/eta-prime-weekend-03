var express = require('express');
var router = express.Router();
var memes = require('../data/memes.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express Memes', memes: memes});
});

module.exports = router;
