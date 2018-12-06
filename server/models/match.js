var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MatchSchema = new Schema({
 terrain : {type: Schema.Types.ObjectId, required: true},
 equipe: {type: [Schema.Types.ObjectId], required: true, minlength:2, maxlength:2},
 resultat:String,
 status:{type: String, enum:['jouer','pasjouer'],default:'pasjouer'},
 statistiques: {type: Schema.Types.ObjectId}
},{ sparse: true,unique: true, index:true });

mongoose.model('Match', MatchSchema);