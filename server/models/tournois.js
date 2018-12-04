var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TournoisSchema = new Schema({
  organisateurs: {type: [{type:String,unique:true,index:true}] ,required: true, unique: true, index: true},
  equipes: {type: [Schema.Types.ObjectId],unique:true,index:true},
  terrains: {type: [Schema.Types.ObjectId],unique:true,index:true},
  calendrier:{type: Schema.Types.ObjectId,unique:true,index:true},
  classement :{type: Schema.Types.ObjectId,unique:true,index:true },
  arbitres : {type: [Schema.Types.ObjectId], minlength: 1,unique:true,index:true},
  affiche : {type: [String],unique:true,index:true},
  reglement: {type:String,unique:true,index:true},
  situation:{type:String,unique:true,index:true},
  poules : {type : [Schema.Types.ObjectId ],unique:true,index:true},
  nom: {type:String, trim: true, maxlength: 300,unique:true,index:true},
  joueurs:{type:[Schema.Types.ObjectId],maxlength:368,unique:true,index:true},
  status: {type:String,unique:true,index:true}
});

mongoose.model('Tournois', TournoisSchema);