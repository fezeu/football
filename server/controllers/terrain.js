
var mongoose = require('mongoose'),
Terrain = mongoose.model('Terrain');

exports.findAll = function(req, res){
  Terrain.find({},function(err, results) {
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Terrain.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};
exports.add = function(req, res) {
  Terrain.create(req.body, function (err, musician) {
    if (err) return console.log(err);
    return res.send(musician);
  });
}
exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Terrain.update({"_id":id}, req.body,
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %d musicians', numberAffected);
      res.send(202);
  });
}
exports.delete = function(req, res){
  var id = req.params.id;
  Terrain.remove({'_id':id},function(result) {
    return res.send(result);
  });
};

exports.import = function(req, res){
  Terrain.create(
    { "nom": "lion", "represente": "cameroun", "banniere": "lion" },
   function (err) {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};