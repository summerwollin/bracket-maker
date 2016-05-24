var mongoose = require('mongoose');

var db = mongoose.connection;
//create schemas
var bracketsSchema = mongoose.Schema({
  bracket_name: String,
  user_name: String,
  initial_location: String,
  round1: Boolean,
  round2: Boolean,
  round3: Boolean
})
var brackets = mongoose.model('brackets', bracketsSchema);

//load mongoose
db.on('error', console.error);
db.once('open', function() {


  //drop users model data before seeding
  mongoose.connection.db.dropCollection('brackets').then(function () {
    console.log('then~~~~~~~~~~~~~~~');
    brackets.find({}).exec(function (err, collection) {
      console.log('length: ', collection.length);
      if (collection.length === 0) {
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Summer', initial_location: 'N1'});
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Alan', initial_location: 'N2'});
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Mike', initial_location: 'N3'});
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Lincoln', initial_location: 'N4'});
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Jeff', initial_location: 'S1'});
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Akyuna', initial_location: 'S2'});
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Dize', initial_location: 'S3'});
          brackets.create({ bracket_name: 'seedbracket', user_name: 'Matt', initial_location: 'S4'});
      }
    });
  })


});

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/bracket');
