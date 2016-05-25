var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bracketsSchema = mongoose.model('brackets');

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoose.model('brackets').find().then(function(brackets) {
    console.log('routeBrackets: ', brackets);
    res.send(brackets);
  });
});
router.post('/bracket/create', function(req, res, next) {
  console.log('bracket post route');

  mongoose.model('brackets')
    .find({bracket_name: req.body.bracket_name})
    .then(function (bracket) {
      console.log('bracket: ', bracket);
      if (bracket.length === 0) {
        var newBracket = new bracketsSchema({bracket_name: req.body.bracket_name, user_name: req.body.user_name, initial_location: 'N1'});
        newBracket.save().then(function () {
            res.send('success');
        })
        console.log('newBracket:', newBracket);
      } else {
        console.log('bracket name already taken');
        res.send('not success');
      }
    })

});

  router.post('/bracket/join', function (req, res, next) {
    mongoose.model('brackets')
      .find({bracket_name: req.body.bracket_name})
      .then(function (bracket) {
        console.log('bracket: ', bracket);
        if (bracket.length === 0) {
          res.send('bracket does not exist');
        } else {
          var location;
          switch (bracket.length) {
            case 1:
            location = 'N2';
            break;
            case 2:
            location = 'N3';
            break;
            case 3:
            location = 'N4';
            break;
            case 4:
            location = 'S1';
            break;
            case 5:
            location = 'S2';
            break;
            case 6:
            location = 'S3';
            break;
            case 7:
            location = 'S4';
            break;
            default:

          }
          var newBracket = new bracketsSchema({bracket_name: req.body.bracket_name, user_name: req.body.user_name, initial_location: location});
          newBracket.save().then(function () {
              res.send('success');
          })
        }
      })
  })

module.exports = router;
