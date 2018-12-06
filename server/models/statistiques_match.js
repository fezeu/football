var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var StatSchema = new Schema({
  statequipe:{type:[
    {equipe: Schema.Types.ObjectId, butsM:Number, butsE: Number, cartons:[{nombre:Number,id:Schema.Types.ObjectId}]}
  ], minlength: 2, maxlength: 2}
},{ sparse: true,unique: true, index:true });

mongoose.model('StatMatch', StatSchema);
