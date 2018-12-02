var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var OrganisateursSchema = new Schema({
 group : [{user:{}, role:{type: String, enum:['admin','emploier']}}]
});

mongoose.model('Organisateurs', OrganisateursSchema);
