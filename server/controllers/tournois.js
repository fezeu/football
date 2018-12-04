var mongoose = require('mongoose'),
Tournois = mongoose.model('Tournois');

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
