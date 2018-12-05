
var mongoose = require('mongoose');
Arbitre = mongoose.model('Arbitre');
Tournois = mongoose.model('Tournois');


exports.findAll = function(req, res){
  Arbitre.find({},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 504')
      return res.send({status:null,message:err})
    }
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Arbitre.findOne({'_id':id},function(err, result) {
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
    //on regarde si l'arbitre existe deja
    Arbitre.findOne({nom:req.body.nom,tournois:req.body.id},function(err,trouver){
      if(err){
        console.log('localhost:3000->db error 504')
        return res.send({status:null,message:err})
      }
      if(trouver){
        console.log('localhost:3000->terrain are ready existe');
        return res.send({status:false,message:'DuplicateValue'})
      }
      Arbitre.create({nom:req.body.nom,age:req.body.age,photo:req.body.photo,tournois:req.body.id},(err,bien)=>{
        if(err){
          console.log('localhost:3000->db error 504')
          return res.send({status:null,message:err})
        }
        //on ajoute le terrain au tournois
        Tournois.findOne({'_id':req.body.id},(err,rep)=>{
          if(err){
            return console.log('localhost:3000->localhost:3000->db error 504 tournois add equipe')
            
          }
          Tournois.update({'_id':req.body.id},{arbitres:rep.arbitres.push(bien._id)},function(err){
            if(err){
              return console.log('localhost:3000->localhost:3000->db error 504 tournois add equipe')
              
            }
            return console.log('localhost:3000->equipe add to tournois 200ok')
          })
        })
        console.log('localhost:3000->team add')
        return res.send({status:true,arbitre:bien})
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
  //on cherche l'arbitre qui appartient a ce tournois
  Arbitre.update({"_id":id,tournois:req.body.id}, {nom:req.body.nom,age:req.body.age,photo:req.body.photo},
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
  Arbitre.remove({'_id':id,tournois:req.body.id},function(result) {
    if (err){
      console.log('localhost:3000->db error 504')
      return res.send({status:null,message:err})
    }
    console.log('localhost:3000->arbitre remove 200ok')
    return res.send({status:true});
  });
};

