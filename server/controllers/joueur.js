
var mongoose = require('mongoose'),
Joueur = mongoose.model('Joueur');
Tournois = mongoose.model('Tournois');
Equipe = mongoose.model('Equipe');

exports.findAll = function(req, res){
  Joueur.find({},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 504')
      return res.send({status:null,message:err})
    }
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Joueur.findOne({'_id':id},function(err, result) {
    if(err){
      console.log('localhost:3000->db error 504')
      return res.send({status:null,message:err})
    }
    return res.send(result);
  });
};
exports.add = function(req, res) {
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
    //on verifie le nombre de joueur pour cette equipe
    Joueur.find({equipe:req.body.equipe,tournois: req.body.id},(err,bien)=>{
      if(err){
        console.log('localhost:3000->db error 504')
        return res.send({status:null,message:err})
      }
      
      //equipe pleine
      if(bien.length>=23){
        console.log('localhost:3000->add player faillure complete team')
        return res.send({status:false,message:'EquipeComplete'})
      }

        //on cherche le tournoi

        Tournois.findOne({'_id':req.body.id},function(err,tourn){
          if(err){
            console.log('localhost:3000->db error 503 find')
            return res.send({status:null,message:err})
          }
          if(!tourn){
            console.log('localhost:3000-> ressource tournoi ',req.body.id,'Not Found')
            return res.send({status:false,message:'TourNotFound'})
          }
                //on creer le joueur
          Joueur.create({nom:req.body.nom,prenom:req.body.prenom,age:req.body.age,photo:req.body.photo,taille:req.body.taille,poids:req.body.poids,poste:req.body.poste,dossard:req.body.dossard,equipe:req.body.equipe,tournois:req.body.id},function(err,good){
            if(err){
             console.log('localhost:3000->db error 503 create')
             return res.send({status:null,message:err})
            }
            j = []
            j = tourn.joueurs
            j.push(good._id)
            Tournois.update({'_id':req.body.id},{joueurs:j}, function (err, save) {
              if (err){
                console.log('localhost:3000->db error 504 update')
                return res.send({status:null,message:err})
              }
              //on verifie si l'equipe existe deja
              Equipe.findOne({tournois:req.body.id,nom:req.body.equipe},(err,trouver)=>{
                if (err){
                  return console.log('localhost:3000->db error 504 on equipe')
                }
                if(trouver){
                  console.log('localhost:3000->team update')
                  return Equipe.update({'_id':trouver._id},{joueurs:trouver.joueurs.push(save._id)})
                }
              })
              console.log('localhost:3000->joueur add 200ok')
              return res.send({status:true,joueur:save});
            });
        })
        })
 

    })

  


}
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
  //on cherche le jouer qui appartient a ce tournois
  Joueur.update({"_id":id,tournois:req.body.id}, {nom:req.body.nom,prenom:req.body.prenom,age:req.body.age,photo:req.body.photo,taille:req.body.taille,poids:req.body.poids,poste:req.body.poste,dossard:req.body.dossard,equipe:req.body.equipe},
    function (err, up) {
      if (err){
        console.log('localhost:3000->db error 504')
        return res.send({status:null,message:err})
      }
      if(up){
        console.log('localhost:3000->joueur update')
        return res.send({status:true})
      }
      console.log('localhost:3000->ressource Tournois not found')
      res.send({status:false,message:'NotFound'})
  });
}
exports.delete = function(req, res){
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
  //on verifie si le jouer etait dans une equipe
  Equipe.findOne({tournois:req.body.id,nom:req.body.equipe},(err,trouver)=>{
    if (err){
      return console.log('localhost:3000->db error 504 on equipe')
    }
    if(trouver){
      console.log('localhost:3000->team update')
      return Equipe.update({'_id':trouver._id},{joueurs:trouver.joueurs.map((val)=>{if(val != id) return val})})
    }
  })
  Joueur.remove({'_id':id,tournois:req.body.id},function(result) {
    if (err){
      console.log('localhost:3000->db error 504')
      return res.send({status:null,message:err})
    }
    console.log('localhost:3000->palyer remove 200ok')
    return res.send({status:true});
  });
};

