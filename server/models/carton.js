var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CartonSchema = new Schema({
  nom:  {type: String, uppercase: true, trim: true, maxlength: 100, unique: true},
  code: {type: String, required: true, minlength: 6, maxlength: 6},
  valeur: {type: Number, require: true}
},{ sparse: true,unique: true, index:true });

mongoose.model('Carton', CartonSchema);