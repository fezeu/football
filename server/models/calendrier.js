var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CalendrierSchema = new Schema({
  dates:{type: [Date],minlength: 31, maxlength: 33,unique:true,sparse: true,index:true},
  tournois: Schema.Types.ObjectId
},{ sparse: true,unique: true, index:true });

mongoose.model('Calendrier', CalendrierSchema);
