var express = require('express');
var router = express.Router();
var memes = require('../public/data/memes.json');
var comments = require('../public/data/comments.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('memes', {title: 'The Memes', memes: memes});
});

module.exports = router;
