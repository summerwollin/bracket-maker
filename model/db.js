var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/bracket');

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
