
var mongoose = require('mongoose'),
Joueur = mongoose.model('Joueur');

exports.findAll = function(req, res){
  Joueur.find({},function(err, results) {
    if(err){
      res.send({status:null,message:err})
    }
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Joueur.findOne({'_id':id},function(err, result) {
    if(err){
      res.send({status:null,message:err})
    }
    return res.send(result);
  });
};
exports.add = function(req, res) {
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'}) 
  }
  autre = true
  for(let elm of req.session.auth.tournois){
    if(req.body.id == elm){
      autre = false
    }
    if(autre){
      return res.send({status:false,message:'NotFound'})
    }
    //on creer le jour
    //on l'ajoute au tournois
  }

  Joueur.create(req.body, function (err, musician) {
    if (err) return console.log(err);
    return res.send(musician);
  });
}
exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Joueur.update({"_id":id}, req.body,
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %d musicians', numberAffected);
      res.send(202);
  });
}
exports.delete = function(req, res){
  var id = req.params.id;
  Joueur.remove({'_id':id},function(result) {
    return res.send(result);
  });
};

exports.import = function(req, res){
  Joueur.create(
    { "nom": "lion", "represente": "cameroun", "banniere": "lion" },
   function (err) {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};