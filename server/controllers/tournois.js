var mongoose = require('mongoose'),
Tournois = mongoose.model('Tournois');
Arbitre = mongoose.model('Arbitre');
Terrain = mongoose.model('Terrain');
Joueur = mongoose.model('Joueur');
Calendrier = mongoose.model('Calendrier');
Match = mongoose.model('Match');
StatMatch = mongoose.model('StatMatch');
Programme = mongoose.model('Programme');
Poule = mongoose.model('Poule')
exports.intit = function(req,res){
    //on verifie les droits
    if(typeof(req.session.auth) == 'undefined'){
        return res.send({status:null,message:'AuhtError'}) 
      }else{
          //on regarde si le tournois es sien
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
pic = function(n,tab){
    tab_r = []
    i = 0;
    for(i;i<tab.lenght;i++){
        if(i!=n)tab_r.push(tab[i]);
    }
    return tab_r
}
randomiseur = function(tab){
    tab_r = []

     if(tab) {
        num = Math.floor(Math.random() * tab.lenght)
        tab_r.push(tab[num])
        return tab_r.concat(randomiseur(pic(num,tab)))
     }
        
      return tab_r 

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
updatepool=function(v,t){
    Tournois.findOne({_id:t},function(err,tour){
        if(err){
            return console.log('err update pool')
        }
        Tournois.update({_id:t},{poules:tour.poules.push(v)},function(err,p){
  
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
            equipes = randomiseur(cool.equipes)
            //terrains = randomiseur(cool.terrains)
            arbitres = randomiseur(arbitres)
            poul = []
            for(let i = 0;i<8;i++){
    
                    Match.create({terrain: '',equipe:[equipes[i],equipes[8+i]],resultat:null,status:pasjouer},function(err,match){
                        if(err){
                         return   res.send({status:null,message:err})
                        }
                        updateprogramme(match.id,''+i+2+'/3'+'2015',req.body.id);
                        poul.push(equipes[i])
                        poul.push(equipes[i+7])
                        if(i%2 == 1){
                            Poule.create({nom:i+'',equipes:poul,niveau:0},function(err,hum){
                                if(bien){
                                    console.log('poul add')
                                    updatepool(bien._id,req.body.id)
                                }
                            })
                        }
                    })
            }
            return res.send({status:true,tournois:getone(req.body.id)})
        }
        res.send({status:null,message:'NotFound'})
    })
}