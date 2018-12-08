var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MatchSchema = new Schema({
 terrain : {type: Schema.Types.ObjectId},
 equipes: [{equipe:Schema.Types.ObjectId,but:Number,default:0}],
 status:{type: String, enum:['jouer','pasjouer'],default:'pasjouer'},
 statistiques: [{joeur:String,but:Number}],
 poule: Schema.Types.ObjectId
},{ sparse: true,unique: true, index:true });

mongoose.model('Match', MatchSchema);