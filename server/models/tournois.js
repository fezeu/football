var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TournoisSchema = new Schema({
  organisateurs: {type: [{type:String}] ,required: true, unique: true, index: true,sparse: true},
  equipes: {type: [Schema.Types.ObjectId],unique:true,index:true, sparse: true},
  terrains: {type: [Schema.Types.ObjectId],unique:true,index:true,sparse: true},
  calendrier:{type: Schema.Types.ObjectId},
  programme:{type: Schema.Types.ObjectId},
  classement :{type: Schema.Types.ObjectId },
  arbitres : {type: [Schema.Types.ObjectId], minlength: 1,unique:true,index:true},
  affiche : {type: [String],unique:true,index:true},
  reglement: {type:String},
  situation:{type:String},
  poules : {type : [Schema.Types.ObjectId ],unique:true,index:true},
  nom: {type:String, trim: true, maxlength: 300,unique:true,index:true},
  joueurs:{type:[Schema.Types.ObjectId],maxlength:368,unique:true,index:true},
  status: {type:String,unique:true,index:true}
},{ sparse: true,unique: true, index:true });

mongoose.model('Tournois', TournoisSchema);