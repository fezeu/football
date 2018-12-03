var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TournoiSchema = new Schema({
  organisateurs: {type: Schema.Types.ObjectId ,required: true, unique: true, index: true},
  equipes: {type: [Schema.Types.ObjectId]},
  terrains: {type: [Schema.Types.ObjectId]},
  calendrier:{type: Schema.Types.ObjectId},
  classement :{type: Schema.Types.ObjectId },
  arbitres : {type: [Schema.Types.ObjectId], minlength: 1},
  affiche : {type: [String]},
  reglement: String,
  situation: String,
  poules : {type : [Schema.Types.ObjectId ]},
  nom: {type:String, trim: true, maxlength: 300},
  joueurs:{type:[Schema.Types.ObjectId],maxlength:368},
  status: String
});

mongoose.model('Tournoi', TournoiSchema);