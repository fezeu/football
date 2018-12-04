var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ClassementSchema = new Schema({
  generale :
      [
        
         
          {
            equipe:{type:Schema.Types.ObjectId},
            butsMarquer:Number,
            butsCeder: Number,
            points: Number
          }
      
      ]

},{ sparse: true,unique: true, index:true });

mongoose.model('ClassementEquipe', ClassementSchema);
