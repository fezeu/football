var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MatchSchema = new Schema({
 equipes: {type:[{equipe:Schema.Types.ObjectId,but:Number,default:0}],sparse: true,unique: true, index:true},
 status:{type: String, enum:['jouer','pasjouer'],default:'pasjouer'},
 statistiques: {type:[{joeur:String,but:Number}],sparse: true,unique: true, index:true},
 poule: Schema.Types.ObjectId
},{ sparse: true,unique: true, index:true });

mongoose.model('Match', MatchSchema);