var express = require('express');
var router = express.Router();
var memes = require('../data/memes.json');
var comments = require('../data/comments.json');
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('memes', {title: 'The Memes', memes: memes});
});

router.get('/magicString', function(req, res, next) {
  var filePath = path.join(__dirname, '../data/comments.json');
  var emptyFile = JSON.stringify([]);

  fs.writeFile(filePath, emptyFile, function(err) {
    if (err) {
      next(err);
    } else {
      res.send(emptyFile);
    }
  });

});

module.exports = router;
