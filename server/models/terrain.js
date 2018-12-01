var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TerrainSchema = new Schema({
  nom: String,
  nombre_place: Number,
  situation: Map
});

mongoose.model('Terrain', TerrainSchema);