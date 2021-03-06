var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bracketsSchema = mongoose.model('brackets');

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoose.model('brackets').find().then(function(brackets) {
    res.send(brackets);
  });
});

router.get('/player/:id', function (req, res, next) {
  mongoose.model('brackets').findOne({_id: req.params.id}).then(function(player) {
    res.send(player);
  })
})

router.get('/bracket/:name', function(req, res, next) {
  mongoose.model('brackets').find({bracket_name: req.params.name}).then(function(brackets) {
    if (brackets.length === 0) {
      res.status(422).json({
        error: 'Bracket does not exist.'
      })
    } else {
      res.send(brackets);
    }
  });
});

router.post('/bracket/create', function(req, res, next) {

  mongoose.model('brackets')
    .find({bracket_name: req.body.bracket_name})
    .then(function (bracket) {
      if (bracket.length === 0) {
        var newBracket = new bracketsSchema({bracket_name: req.body.bracket_name, user_name: req.body.user_name, initial_location: 'N1'});
        newBracket.save().then(function () {
            res.send('success');
        })
      } else {
        res.status(200).json({
          error: 'Bracket name is already taken.'
        })
      }
    })

});

  router.post('/bracket/join', function (req, res, next) {
    mongoose.model('brackets')
      .find({bracket_name: req.body.bracket_name})
      .then(function (bracket) {
        if (bracket.length === 0) {
          res.status(400).json({
            error: 'Bracket does not exist.'
          })
        } else if (bracket.length < 8){
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
        } else {
          res.status(400).json({
            error: 'Bracket is full, you can only view this bracket.'
          })
        }
      })
  })

  router.post('/bracket/result', function (req, res, next) {
    mongoose.model('brackets')
      .findOne({bracket_name: req.body.bracket_name, initial_location: req.body.initial_location})
      .then(function (user) {
        if (user) {
          if (req.body.round === "round1") {
            user.round1 = req.body.result;
            user.save();
            res.send('success');
          } else if (req.body.round === "round2") {
            user.round2 = req.body.result;
            user.save();
            res.send('success');
          } else if (req.body.round === "round3") {
            user.round3 = req.body.result;
            user.save();
            res.send('success');
          } else {
            res.status(422).json({
              error: 'invalid request'
            })
          }
        } else {
          res.status(422).json({
            error: 'invalid request'
          })
        }

      })
  })

  router.post('/bracket/delete/bracket', function (req, res, next) {
    mongoose.model('brackets')
    .find({bracket_name: req.body.bracket_name}).remove().exec()
    .then(function () {
      res.send('deleted bracket');
    })
  })
  router.post('/bracket/delete/user', function (req, res, next) {
    mongoose.model('brackets')
    .findOne({bracket_name: req.body.bracket_name, initial_location: req.body.initial_location}).remove().exec()
    .then(function () {
      res.send('deleted user');
    })
  })

module.exports = router;
