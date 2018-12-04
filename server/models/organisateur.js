var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var OrganisateursSchema = new Schema({
 group : [{user:{}, role:{type: String, enum:['admin','emploier']}}]
},{ sparse: true,unique: true, index:true });

mongoose.model('Organisateurs', OrganisateursSchema);
