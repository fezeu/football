var mongoose = require('mongoose'),
Carton = mongoose.model('Carton');



exports.findAll = function(req, res, next){
  Carton.find({},function(err, results) {
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Carton.findOne({'_id':id},function(err, result) {
    if (err || !result) return res.send({status:false,message:'NotFound'});
    return res.send({status:true,carton:result});
    
  });
};
exports.add = function(req, res) {
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'})
  }else{

  Carton.findOne({ "nom": req.body.nom, "code": req.body.code, "valeur": req.body.valeur },(err,result)=>{
    if( result || err){
      if(result){
        return res.send({status:false,message:'DuplicateError'});
      }else{
        return res.send({status:null,message:err})
      }
      
    }else{ 
      
      Carton.create(
        { "nom": req.body.nom, "code": req.body.code, "valeur": req.body.valeur },
       function (err) {
        if (err){ 
          console.log("une erreur c'est produite pendant la creation d'un carton "+err);
          return res.send({status: null, message:"CreateError"})
        }
        return res.send({status:true});
      });
    }
  })
 }
}
exports.update = function(req, res) {
  var id = req.params.id;
  
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'})
  }else{
    if(id){
      Carton.update({"_id":id}, {'nom':req.body.nom,'code':req.body.code,'valeur':req.body.valeur},
        function (err, numberAffected) {
          if (err ) return res.send({status: null, message:err});
          if(!numberAffected){
            return res.send({status:false, message:"NotFound"})
          }
          return res.send({status: true});
      });
    }else{
      Carton.update({"nom":req.body.nom,'code':req.body.code,'valeur':req.body.valeur}, {'nom':req.body.nom,'code':req.body.code,'valeur':req.body.valeur},
      function (err, result) {
        if ( !result) return res.send({status:false,message:'NotFound'});
        if(err) return res.send({status:null,message:err})
        res.send({status:true});
    });
    }
  }
}
exports.delete = function(req, res){
  var id = req.params.id;
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'})
  }else{
    if(id){
    Carton.deleteOne({'_id':id},function(err) {
      if(!err){
        return res.send({status:true})
      }else{
        return res.send({status:false, message:err})
      }
    });}
    else{
      Carton.deleteOne({"nom":req.nom,"code":req.code,"valeur":req.valeur},function(err){
        if(!err){
          return res.send({status:true})
        }else{
          return res.send({status:false, message:err})
        }
      })
    }
  }
};

