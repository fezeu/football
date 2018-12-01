var mongoose = require('mongoose'),
Carton = mongoose.model('Carton');

exports.findAll = function(req, res){
  Carton.find({},function(err, results) {
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Carton.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};
exports.add = function(req, res) {
  Carton.create(req.body, function (err, musician) {
    if (err) return console.log(err);
    return res.send(musician);
  });
}
exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Carton.update({"_id":id}, req.body,
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %d musicians', numberAffected);
      res.send(202);
  });
}
exports.delete = function(req, res){
  var id = req.params.id;
  Carton.remove({'_id':id},function(result) {
    return res.send(result);
  });
};

exports.import = function(req, res){
  Carton.create(
    { "nom": "rouge", "code": "ffffff", "valeur": 1 },
   function (err) {
    if (err) return console.log(err);
    return res.send(202);
  });
};