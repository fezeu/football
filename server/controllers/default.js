var mongoose = require('mongoose');
Default = mongoose.model('Default');



exports.findAll = function(req, res){
  Default.find({},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 503')
      return res.send({status:null,message:err})
    }
    return res.send(results);
  });
};
exports.update = function(req, res) {
  var id = req.params.id;
  
  if(typeof(req.session.auth) == 'undefined'){
    return res.send({status:null,message:'AuhtError'})
  }else{
    let autre = true
    for(let elm of req.session.auth.tournois){
        if(elm == req.body.id){
            autre = false
        }
    }
    if(autre){
        return   res.send({status:false,message:'NotFound'})
    }
    Default.updateMany({}, {"id":req.body.id},
      function (err, result) {
        if ( !result) return res.send({status:false,message:'NotFound'});
        if(err) return res.send({status:null,message:err})
        res.send({status:true});
    });
    
  }
}