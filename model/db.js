var mongoose = require('mongoose');

var db = mongoose.connection;

//load mongoose
db.on('error', console.error);
db.once('open', function() {

  //create schemas
  var usersSchema = mongoose.Schema({
    name: String
  });
  var users = mongoose.model('users', usersSchema);

  var bracketsSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'users'},
    round1_opponent: {type: mongoose.Schema.ObjectId, ref: 'users',},
    round1_result: Boolean,
    round2_opponent: {type: mongoose.Schema.ObjectId, ref: 'users'},
    round2_result: Boolean,
    round3_opponent: {type: mongoose.Schema.ObjectId, ref: 'users'},
    round3_result: Boolean
  })
  var brackets = mongoose.model('brackets', bracketsSchema);

  //drop users model data before seeding
  // mongoose.connection.db.dropCollection('users', function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('dropped users collection');
  //   }
  // });
  //insert seed data to users model
  users.find({}).exec(function (err, collection) {
    console.log('length: ', collection.length);
      if (collection.length === 0) {
          users.create({ name: 'Summer' });
          users.create({ name: 'Alan' });
          users.create({ name: 'Mike' });
          users.create({ name: 'Lincoln' });
          users.create({ name: 'Jeff' });
          users.create({ name: 'Akyuna' });
          users.create({ name: 'Dize' });
          users.create({ name: 'Matt' });
      }
  });
});

mongoose.connect( process.env.MONGOLAB_PINK_URI || 'mongodb://localhost/bracket');
