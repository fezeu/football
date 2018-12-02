
var mongoose = require('mongoose'),
User = mongoose.model('User');

exports.findAll = function(req, res){
  User.find({},function(err, results) {
    return res.send(results.map((value)=>{return {nom:value.nom,_id:value._id,email:value.email}}));
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  User.findOne({'_id':id},function(err, result) {
    return res.send(result.map((value)=>{return {nom:value.nom,_id:value._id,email:value.email}}));
  });
};
exports.add = function(req, res) {
    User.findOne({'nom':req.body.nom,'email':req.body.email},function(err, results) {
      if(results){
        
        res.send({status:false,message:'CompteTaked'})
      }else{
        if(err){
          console.log(err);
          return res.send({status:null,message:err})
        }
        User.create({'nom':req.body.nom,'password':req.body.password,'email':req.body.email}, function (err, user) {
          if (err) {
            console.log(err);
            return  res.send({status:null,message:err})
          }
          return res.send({status:true});
        });
      }
    });
  

}
exports.update = function(req, res) {
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'}) 
  }else{
      User.update({"_id":req.session._id}, {'nom':req.body.nom,'password':req.body.password,'email':req.body.email},
      function (err, result) {
        if (err) {
          console.log(err);
          return res.send({status:null,message:err})
        }
        console.log('Updated user', result);
        res.send({status:true});
    });
 

  }

}
exports.delete = function(req, res){
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'}) 
  }else{
    User.deleteOne({'_id':req.session._id},function(err) {
      if(!err){
        req.session.auth = undefined;
        return res.send({status:true})
      }else{
        return res.send({status:false, message:err})
      }
    });
  }

};
exports.login = function (req,res){
  user.findOne({'nom':req.body.nom,'password':req.body.password},function(err,result){
    if(err){
      return res.send({status:null,message:err})
    }
    if(result){
      req.session.auth={
        '_id': result._id,
        'nom': result.nom,
        'email': result.email,
        'terrains': result.terrains,
        'arbitres': result.arbitres,
        'calendrier': result.calendrier
      };
      return res.send({status: true})
    }
  })
}
