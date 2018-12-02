var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CalendrierSchema = new Schema({
  dates:{type: [Date],minlength: 31, maxlength: 33}
});

mongoose.model('Calendrier', CalendrierSchema);
