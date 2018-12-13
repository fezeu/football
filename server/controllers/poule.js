
var mongoose = require('mongoose');
Poule = mongoose.model('Poule');
Tournois = mongoose.model('Tournois');
Match = mongoose.model('Match');
EventEmitter= require('events').EventEmitter;
var event1 = new EventEmitter(); 
var event2 = new EventEmitter(); 
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


creerpoule1=function(nom,valeur,equipes,id,event){
  taille = 0;
  for(let i in equipes){
    taille++;
  }
  if(taille == 2){
      return Equipe.findOne({_id:equipes[0]},(err,eqp)=>{
          if(err){
              console.log(err)
              return false
          } 
          return Equipe.findOne({_id:equipes[1]},(err,eqp1)=>{
              if(err){
                  console.log(err)
                  return false
              } 
              return Poule.create({tournois:id,nom:nom,niveau:valeur,
                  classement:[{equipe:equipes[0],nom:eqp.nom},{equipe:equipes[1],nom:eqp1.nom}]},(err,pl)=>{
                      if(err){
                          console.log(err)
                          return false
                      }
                      console.log(pl._id,id)
                      updatepool1(pl._id,id)
                      creermatch1(equipes,pl._id,event)
                  })
          })
      })

  }else{
      return Equipe.findOne({_id:equipes[0]},(err,eqp)=>{
          if(err){
              console.log(err)
              return false
          } 
          return Equipe.findOne({_id:equipes[1]},(err,eqp1)=>{
              if(err){
                  console.log(err)
                  return false
              } 
              return Equipe.findOne({_id:equipes[2]},(err,eqp2)=>{
                  if(err){
                      console.log(err)
                      return false
                  } 
                 return Equipe.findOne({_id:equipes[3]},(err,eqp3)=>{
                      if(err){
                          console.log(err)
                          return false
                      } 
                      Poule.create({tournois:id,nom:nom,niveau:valeur,
                          classement:[{equipe:equipes[0],nom:eqp.nom},{equipe:equipes[1],nom:eqp1.nom},{equipe:equipes[2],nom:eqp2.nom},{equipe:equipes[3],nom:eqp3.nom}]},(err,pl)=>{
                              if(err){
                                  console.log(err)
                                  return false
                              }
                              creermatch1(equipes,pl._id,event)
                              updatepool1(pl._id,id)
                              
                          })
                  })
              })
          })
      })
      
  }

}
creermatch1 = function(equipes, id,event){
  
  if(equipes.length == 2){
      Equipe.findOne({_id:equipes[0]},(err,eqp)=>{
          if(err){
              console.log(err)
              return false
          }
          Equipe.findOne({_id:equipes[1]},(err,eqp1)=>{
              if(err){
                  console.log(err)
                  return false
              }
              Match.create({equipes:[{equipe:equipes[0],but:0,nom:eqp.nom},{equipe:equipes[1],but:0,nom:eqp1.nom}],status:'pasjouer',poule:id},(err, bien)=>{
                  if(err){
                      console.log(err)
                      return false
                  }
                  console.log('localhost:3000->match create',equipes[0],' ',equipes[1])
                  event.emit('match')
                })
          })
      })

  }else {
      if(equipes.length==4){
          
          creermatch1([equipes[0],equipes[1]],id,event);
          creermatch1([equipes[1],equipes[3]],id,event);
          creermatch1([equipes[2],equipes[3]],id,event);
          creermatch1([equipes[0],equipes[2]],id,event);
          creermatch1([equipes[0],equipes[3]],id,event);
          creermatch1([equipes[1],equipes[2]],id,event);
      }
  }

}
updatepoole1=function(id){
  Poule.findOne({"_id":id},(err,poule)=>{
      if(err){
          console.log(err)
          return false
      }
      Match.find({poule:id},(err,cool)=>{
          if(err){
              console.log(err)
              return false
          }
          tab = []
          tab = cool
          tab = tab.map((val)=>{return val._id});
          return Poule.updateOne({"_id":id},{matchs:tab},function(err,bien){
              if(err){
                  console.log(err)
                  return false
              }
              return console.log('localhost:3000->poule update',id) 
          })
      })


  })
}
updatepool1=function(v,t){
  Tournois.findOne({_id:t},function(err,tour){
      if(err){
          return console.log('err update pool')
      }
      tab = []
      tab = tour.poules
      tab.push(v)
      Tournois.update({_id:tour._id},{poules:tab},(err,p)=>{

          
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
      creerpoule1(req.body.nom,req.body.valeur,req.body.equipes,req.body.id)
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
      
      let nombre = 0
      event1.on('match',(e)=>{
        nombre++;
        if(nombre == 4){
          Poule.find({tournois:id},(err,tout)=>{
            tab=[]
            tab = tout
            for(let i of tab){
                updatepoole(i._id)
            }
            Tournois.updateOne({_id:id},{status:'incomplet2'},(err,tour)=>{
                return res.send({status:true,tournois:id})

             })
          })
        }
      })
      creerpoule1('MATCH 1',2,[t1[0].equipe,t2[1].equipe],id,event1);
      creerpoule1('MATCH 2',2,[t1[1].equipe,t2[0].equipe],id,event1);
      creerpoule1('MATCH 3',2,[t3[0].equipe,t4[1].equipe],id,event1);
      creerpoule1('MATCH 4',2,[t3[1].equipe,t4[0].equipe],id,event1); 
      
    })
}


exports.demi = function(req,res){
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
      Poule.find({niveau:2,tournois:id},function(err,pouls){
      if(err){
        res.send({status:null,message:err})
      }
      
      let t1 =[];
      let t2 ;
      let t3 ;
      let t4 ;
     console.log(pouls)
      for(let i=0;i<4;i++){
        if(pouls[i].nom =='MATCH 1'){
          t1 = pouls [i].classement[0].equipe;
        }
        if(pouls[i].nom =='MATCH 2'){
          t2 = pouls [i].classement[0].equipe;
        }
        if(pouls[i].nom =='MATCH 3'){
          t3 = pouls [i].classement[0].equipe;
        }
        if(pouls[i].nom =='MATCH 4'){
          t4 = pouls [i].classement[0].equipe;
        }          
      }
      
      let nombre = 0
      event2.on('match',(e)=>{
        nombre++;
        if(nombre == 2){
          Poule.find({tournois:id},(err,tout)=>{
            tab=[]
            tab = tout
            for(let i of tab){
                updatepoole(i._id)
            }
            Tournois.updateOne({_id:id},{status:'incomplet3'},(err,tour)=>{
                return res.send({status:true,tournois:id})

             })
          })
        }
      })
      console.log(t1,'t1',t2,'t2',t3,'t3',t4)
      creerpoule1('MATCH 5',3,[t1,t2],id,event2);
      creerpoule1('MATCH 6',3,[t3,t4],id,event2);
    })
}