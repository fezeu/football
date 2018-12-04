var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var EquipeSchema = new Schema({
  nom: {type: String, lowercase: true, trim: true, maxlength: 100},
  reprente: {type: String, lowercase: true, trim: true, maxlength: 100},
  banniere: String,
  coach: {type: Schema.Types.ObjectId, required : true},
  joueurs:{type: [Schema.Types.ObjectId], minlength: 11, maxlength: 23, required: true, index: true, unique: true, sparse: true},
});

mongoose.model('Equipe', EquipeSchema);