var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  nom: {type:String, trim: true, required: true},
  password: {type: String, required: true},
  email: {type:String, required: true},
  terrains: {type: [ Schema.Types.ObjectId], default: [],unique:true,index:true, sparse: true},
  arbitres: {type: [ Schema.Types.ObjectId ], default: [],unique:true,index:true,sparse: true},
  calendrier: {type: [ Schema.Types.ObjectId ], default: [],unique:true,index:true,sparse:true},
  tournois:{type:[Schema.Types.ObjectId],default:[],unique:true,index:true,sparse: true}
});

mongoose.model('User', UserSchema);
