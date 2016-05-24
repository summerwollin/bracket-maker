var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  // mongoose.model('users').find(function(err, users) {
  //   res.send(users);
  // });
  console.log('router');
  res.render('index', { title: 'Express' });
});

module.exports = router;
