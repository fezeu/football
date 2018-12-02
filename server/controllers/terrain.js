
var mongoose = require('mongoose'),
Terrain = mongoose.model('Terrain');
User = mongoose.model('User');

exports.findAll = function(req, res){
  Terrain.find({},function(err, results) {
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  User.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};
exports.add = function(req, res) {
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'}) 
  }else{
    for( let id in req.session.auth.terrains){
      Terrain.findOne({'_id':id},function(err,result){
        if(result){
          return res.send({status: false, message:'DuplicateValue'});
        }
      })
      Terrain.create({'nom':req.body.nom,'nombre_place':req.body.nombre_place,'situation':req.body.situation},function(err,result){
        if(result){
          req.session.auth.terrains.push(result._id)
          User.update({'_id':req.session.auth._id},{terrains:req.session.auth.terrains},function(err,resultup){
            if(resultup){
              return res.send({status:true})
            }else{
              return res.send({status:null,message:err})
            }
          })
          
        }
      })

    }
    
  
  }
}
exports.update = function(req, res) {
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'}) 
  }else{
    let id = req.params.id
    if(id){
      let autre = True
      for (let elm in req.session.auth.terrains){
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
      let autre = True
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

