var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ClassementSchema = new Schema({
  generale :[
    {joueur:{type:Schema.Types.ObjectId},buts:Number,matchJouer: Number, carthons:[{nombre:Number,idCarton:Schema.Types.ObjectId}]}
  ]
});

mongoose.model('ClassementJoueur', ClassementSchema);
