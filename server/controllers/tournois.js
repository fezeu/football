var mongoose = require('mongoose'),
Tournois = mongoose.model('Tournois');
Arbitre = mongoose.model('Arbitre');
Terrain = mongoose.model('Terrain');
Joueur = mongoose.model('Joueur');
Calendrier = mongoose.model('Calendrier');
Match = mongoose.model('Match');
StatMatch = mongoose.model('StatMatch');
Programme = mongoose.model('Programme');
Poule = mongoose.model('Poule');
Equipe = mongoose.model('Equipe');

var EventEmitter = require('events').EventEmitter;

exports.intit = function(req,res){
    //on verifie les droits
    if(typeof(req.session.auth) == 'undefined'){
        return res.send({status:null,message:'AuhtError'}) 
      }else{
          //on regarde si le tournois est sien
        let autre = true
        for(let elm of req.session.auth.tournois){
            if(elm == req.body.id){
                autre = false
            }
        }
        if(autre){
            return   res.send({status:false,message:'NotFound'})
        }
         Tournois.updateOne({'_id':req.body.id},{nom:req.body.nom,situation:req.body.situation,reglement:req.body.reglement,status:'incomplet0'},function(err,resultat){
            if(err){
               return res.send({status:null, message:err})
            }
            return res.send({status:true})
         })
      }
}

randomiseur = function(tab){

     if(tab!=[]) {
        let num = Math.floor(Math.random() * tab.lenght)
        console.log(num,tab)
        return tab.splice(num).concat(randomiseur(tab))
     }
        
      return [] 

}
updateprogramme=function(id,date,idp){
    Tournois.findOne({_id:idp},function(err,t){
        if(err){
            return console.log('errp')
        }
        Programme.findOne({_id:t.programme},function(err,p){
            if(p){
                Programme.updateOne({_id:idp},{matchs:p.matchs.push({match:id,date:date})})
            }
        })
    })

}
creerpoule=function(nom,valeur,equipes,id,event){
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
                        updatepool(pl._id,id)
                        creermatch(equipes,pl._id,event)
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
                        var t = [eqp,eqp1,eqp2,eqp3]
                        var cle
                        var classer = true
                        while(classer){
                            classer = false
                            for(let i = 0; i<t.length-1;i++){
                                if(t[i].nom>t[i+1].nom){
                                    cle = t[i+1];
                                    t[i+1] = t[i]
                                    t[i] = cle
                                    classer = true
                                }
                            }
                        }
                        Poule.create({tournois:id,nom:nom,niveau:valeur,
                            classement:[{equipe:t[0]._id,nom:t[0].nom},{equipe:t[1]._id,nom:t[1].nom},{equipe:t[2]._id,nom:t[2].nom},{equipe:t[3]._id,nom:t[3].nom}]},(err,pl)=>{
                                if(err){
                                    console.log(err)
                                    return false
                                }
                                creermatch(equipes,pl._id,event)
                                updatepool(pl._id,id)
                                
                            })
                    })
                })
            })
        })
        
    }

}
creermatch = function(equipes, id,event){
    
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
            creermatch([equipes[1],equipes[2]],id,event);
            creermatch([equipes[0],equipes[1]],id,event);
            creermatch([equipes[1],equipes[3]],id,event);
            creermatch([equipes[0],equipes[2]],id,event);
            creermatch([equipes[2],equipes[3]],id,event);
            creermatch([equipes[0],equipes[3]],id,event);
           
            
           
            
            
        }
    }

}
updatepoole=function(id){
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
updatepool=function(v,t){
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

exports.findAll = function(req, res){
    Tournois.find({},function(err, results) {
      if(err){
        res.send({status:false,message:err})
      }
      return res.send(results);
    });
  };
  exports.status = function(req,res){
    let id = req.params.id
    Tournois.findOne({'_id':id},function(err, result) {
        if(err){
          res.send({message:err})
        }
        return res.send({status:result.status});
      });
}
  exports.findById = function(req, res){
    var id = req.params.id;
    Tournois.findOne({'_id':id},function(err, result) {
      if(err){
        res.send({status:false,message:err})
      }
      return res.send(result);
    });
  };
exports.generate = function(req,res){
    if(typeof(req.session.auth) == 'undefined'){
        return res.send({status:null,message:'AuhtError'}) 
      }
    Tournois.findOne({"_id":req.body.id},function(err,cool){
        if(err){
            res.send({status:null,message:err})
        }
        
        if(cool){
            if(!cool.equipes)return res.send({status:false,message:'PasEquipe'})
            if(cool.equipes.length>17)return res.send({status:false,message:'PasAssezDEquipes'})
            if(cool.status=='incomplet1')return res.send({status:false,message:'Encour'})
            equipes = []
            equipes = cool.equipes
            //terrains = randomiseur(cool.terrains)
            //arbitres = randomiseur(arbitres)
            let event = new EventEmitter()
            let count = 0
            event.on('match',()=>{
                count += 1
                if(count == 24){
                    Poule.find({tournois:req.body.id},(err,tout)=>{
                        tab=[]
                        tab = tout
                        for(let i of tab){
                            updatepoole(i._id)
                        }
                        Tournois.updateOne({_id:req.body.id},{status:'incomplet1'},(err,tour)=>{
                            return res.send({status:true,tournois:req.body.id})

                         })
                          
                       
                        
                        
                    })
                }
            })
            creerpoule('GROUPE A',1,equipes.splice(0,4),req.body.id,event) 
            creerpoule('GROUPE B',1,equipes.splice(0,4),req.body.id,event)
            creerpoule('GROUPE C',1,equipes.splice(0,4),req.body.id,event)
            creerpoule('GROUPE D',1,equipes.splice(0,4),req.body.id,event)
           
            
        }else{
            res.send({status:null,message:'NotFound'})
        }
        
    })
}