var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PouleSchema = new Schema({
  nom: {type:String, trim: true, required: true},
  matchs: {type: [Schema.Types.ObjectId], unique: true, index: true, sparse: true},
  niveau: {type: Number}, 
  classement: {type: [{equipe:Schema.Types.ObjectId,points:Number,gagner:Number,perdue:Number,Null:Number,buts_pour:Number,buts_contre:Number}]}
},{ sparse: true,unique: true, index:true });

mongoose.model('Poule',PouleSchema);
