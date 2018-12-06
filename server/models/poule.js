var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PouleSchema = new Schema({
  nom: {type:String, trim: true, required: true},
  equipes: {type: [Schema.Types.ObjectId], required: true,minlength: 2, maxlength: 4, unique: true, index: true, sparse: true},
  niveau: {type: Number}, 
  classement: {type: Schema.Types.ObjectId}
},{ sparse: true,unique: true, index:true });

mongoose.model('Poule',PouleSchema);
