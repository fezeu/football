var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PouleSchema = new Schema({
  nom: {type:String, trim: true, required: true},
  matchs: {type: [Schema.Types.ObjectId],default:[], unique: true, index: true, sparse: true},
  niveau: {type: Number}, 
  classement: {type: [{equipe:Schema.Types.ObjectId,points:{type:Number,default:0},gagner:{type:Number,default:0},perdue:{type:Number,default:0},Null:{type:Number,default:0},buts_pour:{type:Number,default:0},buts_contre:{type:Number,default:0}}], sparse: true,unique: true, index:true },
  tournois: Schema.Types.ObjectId
},{ sparse: true,unique: true, index:true });

mongoose.model('Poule',PouleSchema);
