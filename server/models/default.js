var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var DefaultSchema = new Schema({
  id:Schema.Types.ObjectId
},{ sparse: true,unique: true, index:true });

mongoose.model('Default', DefaultSchema);
