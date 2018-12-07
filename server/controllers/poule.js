
var mongoose = require('mongoose');
Poule = mongoose.model('Poule');
Tournois = mongoose.model('Tournois');


exports.findAll = function(req, res){
  Poule.find({"tournois":req.body.id},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 503')
      return res.send({status:null,message:err})
    }
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Poule.findOne({'_id':id},function(err, result) {
    if(err){
      console.log('localhost:3000->db error 503')
     return res.send({status:null,message:err})
    }
    return res.send(result);
  });
};


creerpoule=function(nom,valeur,equipes,id){
  if(equipes.lenght == 2){
      Poule.create({tournois:id,nom:nom,niveau:valeur,
          classement:[{equipe:equipes[0]},{equipe:equipes[1]}]},function(){
              if(err){
                  console.log(err)
                  return false
              }
              updatepool(pl._id,id)
              creermatch(equipes,pl._id)
          })
  }else{
      Poule.create({tournois:id,nom:nom,niveau:valeur,
          classement:[{equipe:equipes[0]},{equipe:equipes[1]},{equipe:equipes[2]},{equipe:equipes[3]}]},function(err,pl){
              if(err){
                  console.log(err)
                  return false
              }
              updatepool(pl._id,id)
              creermatch(equipes,pl._id)
          })
  }

}
creermatch = function(equipes, id){
  if(equipes.lenght == 2){
      Match.create({equipes:[{equipe:equipes[0],but:0},{equipe:equipes[1],but:0}],status:'pasjoeur',poule:id},function(err, bien){
        if(err){
            console.log(err)
            return false
        }
       return updatepoole(bien._id,id)  
      })
  }else {
      if(equipes.lenght>2){
          let equipe = equipes.pop()
          for(let i of equipes){
              creermatch([].push(equipe,i),id)
          }
          creermatch(equipes,id)
      }
  }

}
updatepoole=function(idmatch,id){
 return Poule.findOne({"_id":id},function(err,poule){
      if(err){
          console.log(err)
          return false
      }
      tab = []
      tab = poule.matchs
      tab.push(idmatch)
      return Poule.updateOne({"_id":id},{matchs:tab},function(err,bien){
          if(err){
              console.log(err)
              return false
          }
          console.log('poule update')
          return true
      })
  })
}
updatepool=function(v,t){
  Tournois.findOne({_id:t},function(err,tour){
      if(err){
          return console.log('err update pool')
      }
      tab = []
      tab = tour
      tab.poules.push(v)
      Tournois.update({_id:t},{poules:tab},function(err,p){

      })
  })

}
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
    //on regarde si la poule existe deja
    Poule.findOne({nom:req.body.nom,niveau:req.body.niveau,tournois:req.body.id},function(err,trouver){
      if(err){
        console.log('localhost:3000->db error 503')
        return res.send({status:null,message:err})
      }
      if(trouver){
        console.log('localhost:3000->terrain are ready existe');
        return res.send({status:false,message:'DuplicateValue'})
      }
      creerpoule(req.body.nom)
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
  //on cherche l'arbitre qui appartient a ce tournois
  Poule.update({"_id":id,tournois:req.body.id}, {nom:req.body.nom,niveau:req.body.niveau,classement:req.body.classement},
    function (err, up) {
      if (err){
        console.log('localhost:3000->db error 504')
        return res.send({status:null,message:err})
      }
      if(up){
        console.log('localhost:3000->arbitre update')
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
  Poule.remove({'_id':id,tournois:req.body.id},function(result) {
    if (err){
      console.log('localhost:3000->db error 504')
      return res.send({status:null,message:err})
    }
    console.log('localhost:3000->arbitre remove 200ok')
    return res.send({status:true});
  });
};

