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
  mongoose.connection.db.dropCollection('users').then(function () {
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
    }).then(function () {
      users.find({}).exec(function (err, collection) {
        var usersIds = [];
        collection.forEach(function (user) {
          usersIds.push(user._id);
        })
        console.log(usersIds);
      })
  })
  })
//   users.find({}).exec(function (err, collection) {
//     console.log('length: ', collection.length);
//       if (collection.length === 8) {
//
//       }
//
});

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/bracket');
