
var mongoose = require('mongoose');
Joueur = mongoose.model('Joueur');
Equipe = mongoose.model('Equipe');
Tournois = mongoose.model('Tournois');


exports.findAll = function(req, res){
  Equipe.find({},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 504')
      return res.send({status:null,message:err})
    }
    return res.status(200).send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Equipe.findOne({'_id':id},function(err, result) {
    if(err){
      console.log('localhost:3000->db error 504')
     return res.send({status:null,message:err})
    }
    return res.status(200).send(result);
  });
};
exports.add = function(req, res) {
  //on verifie si le user est connecter
  if(typeof(req.session.auth) == 'undefined'){
    console.log('localhost:3000->authentification fallure')
    return res.status(401).send({status:null,message:'AuhtError'}) 
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
      return res.status(404).send({status:false,message:'NotFound'})
    }
    //on regarde le nombre d'equipe du tournois
    Tournois.findOne({'_id':req.body.id},function(err,tour){
      if(err){
        console.log('localhost:3000->db error 503')
        return res.status(503).send({status:null,message:err})
      }
      if(!tour){
        console.log('localhost:3000->None tournoi')
        return res.send({status:null,message:'NoneTournoi'})
      }
      if(tour.equipes.length>=16){
        console.log('localhost:3000->add team fallure team are complete')
        return res.send({status:null,message:'TeamComplete'})
      }
      // on regarde le nombre de jouer dans l'equipe
      Joueur.find({equipe:req.body.nom,tournois:req.body.id},(err,players)=>{
        if(err){
          console.log('localhost:3000->db error 503')
          return res.status(503).send({status:null,message:err})
        }
        if(players){
          if(/*players.length>10 && players.length<24*/true){
            //on verifie si l'equipe a deja et creer
            Equipe.findOne({nom:req.body.nom,tournois:req.body.id},function(err,trouver){
              if(err){
                console.log('localhost:3000->db error 503')
                return res.status(503).send({status:null,message:err})
              }
              if(trouver){
                console.log('localhost:3000->team are ready existe');
                return res.status(404).send({status:false,message:'DuplicateValue'})
              }
              Equipe.create({nom:req.body.nom,represente:req.body.represente,banniere:req.body.banniere,coach:req.body.caoch,joueurs: players.map((player)=>{return player._id}),tournois:req.body.id},(err,bien)=>{
                if(err){
                  console.log('localhost:3000->db error 503')
                  return res.status(503).send({status:null,message:err})
                }
                //on ajoute l'equipe au tournois
                Tournois.findOne({'_id':req.body.id},(err,rep)=>{
                  if(err){
                    return console.log('localhost:3000->db error 504 tournois add equipe')
                    
                  }
                  tab = []
                  tab = rep.equipes
                  tab.push(bien._id)
                  Tournois.update({'_id':req.body.id},{equipes:tab},function(err){
                    if(err){
                      return console.log('localhost:3000->db error 504 tournois add equipe')
                      
                    }
                    return console.log('localhost:3000->equipe add to tournois 200ok')
                  })
                })
                console.log('localhost:3000->team add')
                return res.status(201).send({status:true,equipe:bien})
              })
            })

          }
        }
        console.log('localhost:3000->too less players to create team')
        return res.status({status:false,message:'RequirePlayer'})
      })
    });      
               
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
  Equipe.update({"_id":id,tournois:req.body.id}, {nom:req.body.nom,represente:req.body.represente,banniere:req.body.banniere},
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
  Equipe.remove({'_id':id,tournois:req.body.id},function(result) {
    if (err){
      console.log('localhost:3000->db error 504')
      return res.send({status:null,message:err})
    }
    console.log('localhost:3000->palyer remove 200ok')
    return res.send({status:true});
  });
};

