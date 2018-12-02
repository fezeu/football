var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  nom: {type:String, trim: true, required: true},
  password: {type: String, required: true},
  email: {type:String, required: true},
  terrains: [ Schema.Types.ObjectId],
  arbitres: [ Schema.Types.ObjectId ],
  calendrier: [ Schema.Types.ObjectId ]
});

mongoose.model('User', UserSchema);
