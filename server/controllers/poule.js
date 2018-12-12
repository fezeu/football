
var mongoose = require('mongoose');
Poule = mongoose.model('Poule');
Tournois = mongoose.model('Tournois');
Match = mongoose.model('Match');
EventEmitter= require('events').EventEmitter;
var event = new EventEmitter(); 

exports.findAllT = function(req, res){
  Poule.find({},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 503')
      return res.send({status:null,message:err})
    }
    return res.send(results);
  });
};

exports.findAll = function(req, res){
  Poule.find({"tournois":req.body.id},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 503')
      return res.send({status:null,message:err})
    }
    return res.send({status:true, poules:results});
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
          classement:[{equipe:equipes[0]},{equipe:equipes[1]}]},function(err,pl){
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
        console.log('localhost:3000->poule are ready existe');
        return res.send({status:false,message:'DuplicateValue'})
      }
      creerpoule(req.body.nom,req.body.valeur,req.body.equipes,req.body.id)
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
      console.log('localhost:3000->db error 503')
      return res.send({status:null,message:err})
    }
    console.log('localhost:3000->poule remove 200ok')
    return res.send({status:true});
  });
};

exports.quart = function(req,res){
  let id = req.params.id
      //on verifie si le user est connecter
      if(typeof(req.session.auth) == 'undefined'){
        console.log('localhost:3000->authentification fallure')
        return res.send({status:null,message:'AuhtError'}) 
      }
        //on verifie si le tournoi est sein
      let autre = true
      for(let elm of req.session.auth.tournois){
        if(id == elm){
          autre = false
        }
      }
      if(autre){
        console.log('localhost:3000->ressource Tournois not found')
        return res.send({status:false,message:'NotFound'})
       }
      Poule.find({niveau:1,tournois:id},function(err,pouls){
      if(err){
        res.send({status:null,message:err})
      }
      
      let t1 ;
      let t2 ;
      let t3 ;
      let t4 ;
     console.log(pouls)
      for(let i=0;i<4;i++){
        if(pouls[i].nom =='GROUPE A'){
          t1 = pouls [i].classement;
        }
        if(pouls[i].nom =='GROUPE B'){
          t2 = pouls [i].classement;
        }
        if(pouls[i].nom =='GROUPE C'){
          t3 = pouls [i].classement;
        }
        if(pouls[i].nom =='GROUPE D'){
          t4 = pouls[i].classement;
        }
      }
      console.log(t1,t2,t3,t4)
      let nombre = 0
      event.on('match_q',(e)=>{
        nombre++;
        if(nombre == 4){
          res.send({status:true})
        }
      })
      Poule.findOne({nom:'MATCH 1',niveau:2,tournois:id},function(err,trouver){
        if(err){
          console.log('localhost:3000->db error 503')
          return res.send({status:null,message:err})
        }
        if(trouver){
          console.log('localhost:3000->poule are ready existe');
          return res.send({status:false,message:'DuplicateValue'})
        }
 
        Poule.create({tournois:id,nom:'MATCH 1',niveau:2,
          classement:[{equipe:t1[0].equipe},{equipe:t2[1].equipe}]},function(err,pl){
              if(err){
                  console.log(err)
                  return false
              }
              updatepool(pl._id,id);
              
              Match.create({equipes:[{equipe:t1[0].equipe,but:0},{equipe:t2[1].equipe,but:0}],status:'pasjouer',poule:id},function(err, bien){
                if(err){
                    console.log(err)
                    return false
                }
                event.emit('match_q')
                Poule.findOne({nom:'MATCH 2',niveau:2,tournois:id},function(err,trouver){
                  if(err){
                    console.log('localhost:3000->db error 503')
                    return res.send({status:null,message:err})
                  }
                  if(trouver){
                    console.log('localhost:3000->poule are ready existe');
                    return res.send({status:false,message:'DuplicateValue'})
                  }
                  
                  Poule.create({tournois:id,nom:'MATCH 2',niveau:2,
                  classement:[{equipe:t1[1].equipe},{equipe:t2[0].equipe}]},function(err,pl){
                      if(err){
                          console.log(err)
                          return false
                      }
                      updatepool(pl._id,id);
                      
                      Match.create({equipes:[{equipe:t1[1].equipe,but:0},{equipe:t2[0].equipe,but:0}],status:'pasjouer',poule:id},function(err, bien){
                        if(err){
                            console.log(err)
                            return false
                        }
                        event.emit('match_q')
                        Poule.findOne({nom:'MATCH 3',niveau:2,tournois:id},function(err,trouver){
                          if(err){
                            console.log('localhost:3000->db error 503')
                            return res.send({status:null,message:err})
                          }
                          if(trouver){
                            console.log('localhost:3000->poule are ready existe');
                            return res.send({status:false,message:'DuplicateValue'})
                          }
                          
                          Poule.create({tournois:id,nom:'MATCH 3',niveau:2,
                          classement:[{equipe:t3[0].equipe},{equipe:t4[1].equipe}]},function(err,pl){
                              if(err){
                                  console.log(err)
                                  return false
                              }
                              updatepool(pl._id,id);
                             
                              Match.create({equipes:[{equipe:t3[0].equipe,but:0},{equipe:t4[1].equipe,but:0}],status:'pasjouer',poule:id},function(err, bien){
                                if(err){
                                    console.log(err)
                                    return false
                                }
                                event.emit('match_q')
                                Poule.findOne({nom:'MATCH 4',niveau:2,tournois:id},function(err,trouver){
                                  if(err){
                                    console.log('localhost:3000->db error 503')
                                    return res.send({status:null,message:err})
                                  }
                                  if(trouver){
                                    console.log('localhost:3000->poule are ready existe');
                                    return res.send({status:false,message:'DuplicateValue'})
                                  }
                                 
                                  
                                  Poule.create({tournois:id,nom:'MATCH 3',niveau:2,
                                  classement:[{equipe:t3[1].equipe},{equipe:t4[0].equipe}]},function(err,pl){
                                      if(err){
                                          console.log(err)
                                          return false
                                      }
                                      updatepool(pl._id,id);
                                     
                                      Match.create({equipes:[{equipe:t3[1].equipe,but:0},{equipe:t4[0].equipe,but:0}],status:'pasjouer',poule:id},function(err, bien){
                                        if(err){
                                            console.log(err)
                                            return false
                                        }
                                        event.emit('match_q')
                                       return updatepoole(bien._id,id)  
                                      })
                                  })
                                })
                               return updatepoole(bien._id,id)  
                              })
                          })
                        })
                       return updatepoole(bien._id,id)  
                      })
                  })
                })
               return updatepoole(bien._id,id)  
              })
              
          })
        
      })
      
      
      
    })
}