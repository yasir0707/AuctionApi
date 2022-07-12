var mongoose = require('./conn');

var RegisterSchema = new mongoose.Schema({
  
    Name:{
        type: String
    },
    
    Number:{
        type: Number,
        required:[true," - is required field"],
    },
    Age:{
        type: Number
    },
    Password:{
        type: String
    },
    Shop:{
        type:String
    },
    Role:{
        type: String,
        required:true
    },
    Address:{
        type:String
    }
   
});
module.exports = mongoose.model('reg',RegisterSchema);