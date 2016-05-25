var mongoose = require('mongoose');
// mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/bracket');
var dbjs = require('./db');
var db = mongoose.connection;
var brackets = mongoose.model('brackets');

db.on('error', console.error);
db.once('open', function() {

  //drop users model data before seeding
    mongoose.connection.db.dropCollection('brackets').then(function () {
      brackets.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
          Promise.all([
            brackets.create({ bracket_name: 'seedbracket', user_name: 'Summer', initial_location: 'N1'}),
            brackets.create({ bracket_name: 'seedbracket', user_name: 'Alan', initial_location: 'N2'}),
            brackets.create({ bracket_name: 'seedbracket', user_name: 'Mike', initial_location: 'N3'}),
            brackets.create({ bracket_name: 'seedbracket', user_name: 'Lincoln', initial_location: 'N4'}),
            brackets.create({ bracket_name: 'seedbracket', user_name: 'Jeff', initial_location: 'S1'}),
            brackets.create({ bracket_name: 'seedbracket', user_name: 'Akyuna', initial_location: 'S2'}),
            brackets.create({ bracket_name: 'seedbracket', user_name: 'Dize', initial_location: 'S3'}),
            brackets.create({ bracket_name: 'seedbracket', user_name: 'Matt', initial_location: 'S4'})
          ]).then(function () {
            console.log('done');
            mongoose.connection.close();
          })
        }
      })
    }).catch(function (err) {
    console.log('collection does not exist: ', err);
    brackets.find({}).exec(function (err, collection) {
      if (collection.length === 0) {
        Promise.all([
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Summer', initial_location: 'N1'}),
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Alan', initial_location: 'N2'}),
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Mike', initial_location: 'N3'}),
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Lincoln', initial_location: 'N4'}),
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Jeff', initial_location: 'S1'}),
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Akyuna', initial_location: 'S2'}),
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Dize', initial_location: 'S3'}),
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Matt', initial_location: 'S4'})
        ]).then(function () {
          console.log('done');
          mongoose.connection.close();
        })
      }
    })

  })


});
