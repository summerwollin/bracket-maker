// var mongoose = require('mongoose');
// var db = require('./db');
// var users = mongoose.model('users');
//
// db.on('error', console.error);
// db.once('open', function() {
// //drop users model data before seeding
// mongoose.connection.db.dropCollection('users').then(function () {
//   users.find({}).exec(function (err, collection) {
//     console.log('length: ', collection.length);
//     if (collection.length === 0) {
//         users.create({ name: 'Summer' });
//         users.create({ name: 'Alan' });
//         users.create({ name: 'Mike' });
//         users.create({ name: 'Lincoln' });
//         users.create({ name: 'Jeff' });
//         users.create({ name: 'Akyuna' });
//         users.create({ name: 'Dize' });
//         users.create({ name: 'Matt' });
//     }
//   });
//   });
// });
// mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/bracket');
