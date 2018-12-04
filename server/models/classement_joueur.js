var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ClassementSchema = new Schema({
  generale :
   [
        {
          joueur:{type:Schema.Types.ObjectId},
          buts:Number,
          matchJouer: Number, 
          carthons:{type:
            [
            
              {
            
                nombre:Number,
            
                idCarton:Schema.Types.ObjectId
            
              }
          
            ],
            unique: true,
            index: true,
            sparse: true
          }
        }
      ]
 
},{ sparse: true,unique: true, index:true });

mongoose.model('ClassementJoueur', ClassementSchema);
