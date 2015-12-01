var express = require('express');
var router = express.Router();
var comments = require('../data/comments.json');
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/:id?', function(req, res, next) {
  var imgComments = [];
  if (req.params.id) {
    for (var i = 0; i < comments.length; i++) {
      if (comments[i].imageId === req.params.id) {
        imgComments.push(comments[i]);
      }
    }
    res.json(imgComments);
  } else {
    res.send([]);
  }
});

router.post('/', function(req, res, next) {
  var newImgComment = {imageId: req.body.imageId, message: req.body.message};
  if (newImgComment.imageId && newImgComment.message) {
    comments.push(newImgComment);
    var filePath = path.join(__dirname, '../data/comments.json');
    var commentString = JSON.stringify(comments);

    fs.writeFile(filePath, commentString, function(err) {
      if (err) {
        next(err);
      } else {
        res.send(newImgComment);
      }
    });
  } else {
    res.status(400).send('Please enter a comment');
  }

});

module.exports = router;
