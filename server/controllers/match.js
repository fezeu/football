
var mongoose = require('mongoose');
Match = mongoose.model('Match');
Tournois = mongoose.model('Tournois');


exports.findAll = function(req, res){
  Match.find({},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 503')
      return res.send({status:null,message:err})
    }
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Match.findOne({'_id':id},function(err, result) {
    if(err){
      console.log('localhost:3000->db error 504')
     return res.send({status:null,message:err})
    }
    return res.send(result);
  });
};

exports.update = function(req, res) {
    //on verifie si le user est connecter
    if(typeof(req.session.auth) == 'undefined'){
      console.log('localhost:3000->authentification fallure')
      return res.send({status:null,message:'AuhtError'}) 
    }
      //on verifie si le tournoi est sein
    let autre = true
    for(let elm of req.session.auth.tournois){
      if(req.body.id == elm){
        autre = false
      }
    }
    if(autre){
      console.log('localhost:3000->ressource Tournois not found')
      return res.send({status:false,message:'NotFound'})
    }
  var id = req.params.id;
  //on cherche l'arbitre qui appartient a ce tournois
  Match.update({"_id":id}, {equipes:req.body.equipes,status:req.body.status,statistiques:req.body.statistiques},
    function (err, up) {
      if (err){
        console.log('localhost:3000->db error 503')
        return res.send({status:null,message:err})
      }
      if(up){
        console.log('localhost:3000->match update')
        return res.send({status:true})
      }
      console.log('localhost:3000->ressource Tournois not found')
      res.send({status:false,message:'NotFound'})
  });
}

