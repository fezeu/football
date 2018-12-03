var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ArbitresSchema = new Schema({
  nom: {type: String, required: true, trim: true},
  photo: String
});

mongoose.model('Arbitres', ArbitresSchema);
