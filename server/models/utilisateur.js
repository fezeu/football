var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  nom: {type:String, trim: true},
  password: String,
  email: String,
  role : String,
});

mongoose.model('User', UserSchema);
