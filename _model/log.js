var mongoose = require('./conn');

var LogSchema = new mongoose.Schema({
  
    Request:{
        type:String,
    },
    Response:{
        type:String,
    },
    Status:{
        type:String,
    },
    message:String,
    address:String,
    startdate:{
        type:Date,
        default : Date.now
    },
    enddate:{
        type:Date,
        default : Date.now
    },
   
},
{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }

}
);
module.exports = mongoose.model("log",LogSchema);