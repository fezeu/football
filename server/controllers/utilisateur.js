
var mongoose = require('mongoose');
User = mongoose.model('User');
Tournois = mongoose.model('Tournois');
Programme = mongoose.model('Programme');

exports.findAll = function(req, res){
  User.find({},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 504')
    }
    console.log('localhost:3000->get users 200ok')
    return res.send(results.map((value)=>{return {nom:value.nom,_id:value._id,email:value.email,arbitres:value.arbitres,calendrier:value.calendrier,terrains:value.terrains,tournois:value.tournois}}));
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  User.findOne({'_id':id},function(err, result) {
    if(err){
      console.log('localhost:3000->db error 504')
    }
    console.log('localhost:3000->get user 200ok')
    return res.send({nom:result.nom,_id:result._id,email:result.email,terrains:result.terrains,arbitres:result.arbitres,calendrier:result.calendrier,tournois:result.tournois});
  });
};
exports.add = function(req, res) {
    
    User.findOne({'nom':req.body.nom,'email':req.body.email},(err, results)=>{
      if(results){
        console.log('localhost:3000->add user fallure account is taked')
        return res.send({status:false,message:'CompteTaked'})
      }
      
        if(err){
          console.log('localhost:3000->db error 504')
          return res.send({status:null,message:err})
        }
        Tournois.create({organisateurs:[req.body.nom]},(err,ok)=>{
          if (err) {
            console.log('localhost:3000->db error 504')
            return  res.send({status:null,message:err})
          }
          Programme.create({tournois:ok._id},function(err,pro){
            if (err) {
             return console.log('localhost:3000->db error 504')
            }
            Tournois.update({programme:pro._id},function(err,go){
              if (err) {
                return console.log('localhost:3000->db error 504')
               }
            })
          })
          User.create({nom:req.body.nom,password:req.body.password,email:req.body.email, tournois:[ok._id]}, function (err, user) {
            if (err) {
              console.log('localhost:3000->db error 504')
              return  res.send({status:null,message:err})
            }

            console.log('localhost:3000->user add 200ok')
            return res.send({status:true});
          });
        })

      
    });
  

}
exports.update = function(req, res) {
  if(typeof(req.session.auth) == 'undefined'){
    console.log('localhost:3000->auhtentification fallure')
    return res.send({status:null,message:'AuhtError'}) 
  }
  User.update({"_id":req.session._id}, {'nom':req.body.nom,'password':req.body.password,'email':req.body.email},
    function (err, result) {
      if (err) {
        console.log('localhost:3000->db error 504')
        return res.send({status:null,message:err})
      }
      console.log('localhost:3000->user update 200ok')
      return res.send({status:true});
    });
 

  

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
        console.log('localhost:3000->db error 504')
        return res.send({status:null, message:err})
      }
    });
  }

};
exports.login = function (req,res){
  User.findOne({'nom':req.body.nom,'password':req.body.password},function(err,result){
    if(err){
      console.log('localhost:3000->db error 504')
      return res.send({status:null,message:err})
    }
    if(result){
      req.session.auth={
        '_id': result._id,
        'nom': result.nom,
        'email': result.email,
        'tournois': result.tournois
      };
      console.log('localhost:3000->user login 200ok')
      return res.send({status: true, user:{
        '_id': result._id,
        'nom': result.nom,
        'email': result.email,
        'tournois': result.tournois
      }});
    }
    console.log('localhost:3000->authentification fallure')
    return res.send({status:false,message:'AuthError'})
  })
}

exports.logout = function (req,res){
  req.session.auth = undefined;
  console.log('localhost:3000->user logout')
  return res.send({status:true})
}