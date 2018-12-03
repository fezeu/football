var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  nom: {type:String, trim: true, required: true},
  password: {type: String, required: true},
  email: {type:String, required: true},
  terrains: {type: [ Schema.Types.ObjectId], default: []},
  arbitres: {type: [ Schema.Types.ObjectId ], default: []},
  calendrier: {type: [ Schema.Types.ObjectId ], default: []},
  tournois:{type:[Schema.Types.ObjectId],default:[]}
});

mongoose.model('User', UserSchema);
