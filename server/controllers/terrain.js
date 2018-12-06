
var mongoose = require('mongoose'),
Terrain = mongoose.model('Terrain'),
User = mongoose.model('User');

exports.findAll = function(req, res){
  Terrain.find({},function(err, results) {
    if(err){
      res.send({status:false,message:err})
    }
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Terrain.findOne({'_id':id},function(err, result) {
    if(err){
      res.send({status:false,message:err})
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
    //on regarde le nombre d'equipe du tournois
    Tournois.findOne({'_id':req.body.id},function(err,tour){
      if(err){
        console.log('localhost:3000->db error 504')
        return res.send({status:null,message:err})
      }
      if(tour.equipes.length>=16){
        console.log('localhost:3000->add team fallure team are complete')
        return res.send({status:null,message:'TeamComplete'})
      }
      //on verifie si terrain a deja et creer
      Terrain.findOne({nom:req.body.nom,tournois:req.body.id},function(err,trouver){
        if(err){
          console.log('localhost:3000->db error 504')
          return res.send({status:null,message:err})
        }
        if(trouver){
          console.log('localhost:3000->terrain are ready existe');
          return res.send({status:false,message:'DuplicateValue'})
        }
        Terrain.create({nom:req.body.nom,nombre_place:req.body.nombre_place,situation:req.body.situation,tournois:req.body.id},(err,bien)=>{
          if(err){
            console.log('localhost:3000->db error 504')
            return res.send({status:null,message:err})
          }
          //on ajoute le terrain au tournois
          Tournois.findOne({'_id':req.body.id},(err,rep)=>{
            if(err){
              return console.log('localhost:3000->localhost:3000->db error 504 tournois add equipe')
              
            }
            Tournois.update({'_id':req.body.id},{terrains:rep.terrains.push(bien._id)},function(err){
              if(err){
                return console.log('localhost:3000->localhost:3000->db error 504 tournois add equipe')
                
              }
              return console.log('localhost:3000->equipe add to tournois 200ok')
            })
          })
          console.log('localhost:3000->team add')
          return res.send({status:true,equipe:bien})
        })
      })

    });      
               
}
exports.update = function(req, res) {
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'}) 
  }else{
    let id = req.params.id
    if(id){
      let autre = true
      for (let elm of req.session.auth.terrains){
        if(elm == id){
          autre = false
        }
      }
      if(autre){
        return res.send({status:false,message:'NotFound'})
      }else{
          Terrain.update({"_id":id},{'nom':req.body.nom,'nombre_place':req.body.nombre_place,"situation":req.body.situation},function(err,resultat){
            if(err) {
              console.log(err);
              return res.send({status:false,message:err})
            }
            return res.send({status:true})
          })
      }
    }else{
      return res.send({status:false,message:'NotFound'})
    }
  
  }

}
exports.delete = function(req, res){
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'}) 
  }else{
    let id = req.params.id
    if(id){
      let autre = true
      for (let elm in req.session.auth.terrains){
        if(elm == id){
          autre = false
        }
      }
      if(autre){
        return res.send({status:false,message:'NotFound'})
      }else{
        Terrain.deleteOne({'_id':id},function(err) {
          if(!err){
            return res.send({status:true})
          }else{
            return res.send({status:false, message:err})
          }
        });
      }
    }else{
      return res.send({status:false,message:'NotFound'})
    }

  }

};
