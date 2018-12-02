var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TournoiSchema = new Schema({
  organisateurs: {type: Schema.Types.ObjectId ,required: true, unique: true, index: true},
  equipes: {type: Schema.Types.ObjectId, required: true, minlength: 16, maxlength: 16},
  terrains: {type: [Schema.Types.ObjectId], required: true, minlength: 1},
  calendrier:{type: Schema.Types.ObjectId, required: true},
  classement :{type: Schema.Types.ObjectId , required: true},
  arbitres : {type: [Schema.Types.ObjectId], required: true, minlength: 1},
  affiche : {type: [String]},
  reglement: String,
  situation: String,
  poules : {type : [Schema.Types.ObjectId ]}
});

mongoose.model('Tournoi', TournoiSchema);