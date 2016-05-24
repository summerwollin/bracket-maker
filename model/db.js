var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  var kittySchema = mongoose.Schema({
      name: String
  });
  var Kitten = mongoose.model('Kitten', kittySchema);
  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name);
});

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/test');
