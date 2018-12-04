var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CoachSchema = new Schema({
  nom: {type: String, required: true, trim: true},
  photo: String,
  equipe: String,
  tournois: Schema.Types.ObjectId
},{ sparse: true,unique: true, index:true });

mongoose.model('Coach', CoachSchema);
