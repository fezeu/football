
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
  User.findOne({'_id':id},function(err, result) {
    if(err){
      res.send({status:false,message:err})
    }
    return res.send(result);
  });
};
exports.add = function(req, res) {
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'}) 
  }
  else{
    Terrain.find({'nom':req.nom,'nombre_place':req.nombre_place,'situation':req.situation},function(err,result){
      if(err){
        return res.send({status:false,message:err})
      }
      if(result){
        for( let id of req.session.auth.terrains){
          for(let id1 of result){
            if(id==id1._id){
              return res.send({status: false, message:'DuplicateValue'});
            }
          }

        }
       
      }else{
        Terrain.create({'nom':req.nom,'nombre_place':req.nombre_place,'situation':req.situation},function(err,result1){
          if(err){
            return res.send({status: null, message:err})
          }
          if(result1){
            req.session.auth.terrains.push(result1._id)
            User.updateOne({'_id':'5c0508262854981cbc606fcc'},{terrains:[result1._id]},function(err,resultup){
              if(resultup){
                console.log(resultup)
                return res.send({status:true})
              }else{
                return res.send({status:null,message:err})
              }
            })
            
          }
        })
      }
    })
  
  }
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
