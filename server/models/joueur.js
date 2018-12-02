var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var JoueurSchema = new Schema({
  nom: {type: String, required: true, trim: true, maxlength: 100, index: true},
  prenom:{type: String, trim: true, maxlength: 100, index: true},
  age: {type: Number, required: true,min: 0},
  photo: String,
  taille:Number,
  poids: Number,
  poste: String,
  dossard: {type:Number, required: true},
  equipe: {type: Schema.Types.ObjectId},
  equipe_id: String
});

mongoose.model('Joueur', JoueurSchema);