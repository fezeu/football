var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ProgrammeSchema = new Schema({
   matchs: {type: [{match: Schema.Types.ObjectId, date:Date,fichematch: Schema.Types.ObjectId}], maxlength: 33, index: true, unique: true, sparse: true}
},{ sparse: true,unique: true, index:true });

mongoose.model('Programme', ProgrammeSchema);
