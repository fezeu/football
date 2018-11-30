var mongoose = require('mongoose'),
Musician = mongoose.model('Musician');

exports.findAll = function(req, res){
  Musician.find({},function(err, results) {
    return res.send(results);
  });
};
exports.findById = function() {};
exports.add = function() {};
exports.update = function() {};
exports.delete = function() {};