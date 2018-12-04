
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
  //on verifie si le user est connecter
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'}) 
  }
  //on verifie si le tournoi es sein
  autre = true
  for(let elm of req.session.auth.tournois){
    if(req.body.id == elm){
      autre = false
    }
    if(autre){
      return res.send({status:false,message:'NotFound'})
    }
    //on verifie le nombre de joueur pour cette equipe
    Joueur.find({equipe:req.body.equipe,tournois: req.body.id},function(err,bien){
      if(err){}
    })
    //on creer le jour
    Joueur.create({nom:req.body.nom,prenom:req.body.prenom,age:req.body.age,photo:req.body.photo,taille:req.body.taille,poids:req.body.poids,poste:req.body.poste,dossard:req.body.dossard,equipe:req.body.equipe,tournois:req.body.id},function(err,good){

    })
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