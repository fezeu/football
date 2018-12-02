var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PouleSchema = new Schema({
  nom: {type:String, trim: true, required: true},
  equipes: {type: [Schema.Types.ObjectId], required: true,minlength: 2, maxlength: 4},
  niveau: {type: Number, required: true}, 
  classement: {type: Schema.Types.ObjectId, required: true}
});

mongoose.model('Poule',PouleSchema);
