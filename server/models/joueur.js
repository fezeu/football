var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var JoueurSchema = new Schema({
  nom: {type: String, required: true, trim: true, maxlength: 100, index: true},
  prenom:{type: String, trim: true, maxlength: 100},
  age: {type: Number,min: 0},
  photo: String,
  taille:Number,
  poids: Number,
  poste: String,
  dossard: {type:Number},
  equipe: String,
  tournois: Schema.Types.ObjectId
},{ sparse: true,unique: true, index:true });

mongoose.model('Joueur', JoueurSchema);