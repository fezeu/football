
var mongoose = require('mongoose'),
Arbitres = mongoose.model('Arbitres'),
User = mongoose.model('User');

exports.findAll = function(req, res){
  Arbitres.find({},function(err, results) {
    if(err){
      res.send({status:false,message:err})
    }
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Arbitres.findOne({'_id':id},function(err, result) {
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
    Arbitres.find({'nom':req.body.nom},function(err,result){
      if(err){
        return res.send({status:false,message:err})
      }
      if(result){
        for( let id of req.session.auth.arbitres){
          for(let id1 of result){
            if(id==id1._id){
              return res.send({status: false, message:'DuplicateValue'});
            }
          }

        }
       
      }else{
        Arbitres.create({'nom':req.body.nom,'photo':req.body.photo},function(err,result1){
          if(err){
            return res.send({status: null, message:err})
          }
          if(result1){
            req.session.auth.arbitres.push(result1._id)
            User.updateOne({'_id':req.session.auth._id},{calendrier:req.session.auth.arbitres},function(err,resultup){
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
      for (let elm of req.session.auth.arbitres){
        if(elm == id){
          autre = false
        }
      }
      if(autre){
        return res.send({status:false,message:'NotFound'})
      }else{
        Arbitres.update({"_id":id},{'nom':req.body.nom,'photo':req.body.photo},function(err,resultat){
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
      for (let elm in req.session.auth.calendrier){
        if(elm == id){
          autre = false
        }
      }
      if(autre){
        return res.send({status:false,message:'NotFound'})
      }else{
        Calendrier.deleteOne({'_id':id},function(err) {
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
