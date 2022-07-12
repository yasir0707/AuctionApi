var mongoose = require('./conn');

var LoginSchema = new mongoose.Schema({
  
    Number:{
        type: Number,
        required:true
    },
    Password:{
        type: String
    },
    Role:{
        type: String,
        required:true
    },
   Status:{
       type:Number,
       default:1
   },
});
module.exports = mongoose.model('login',LoginSchema);