var mongoose = require('./conn');

var BidSchema = new mongoose.Schema({
  
    UserId:{
        type: String,
        required:true
    },
    ProductId:{
        type: String,
        required:true
    },
    
    BidPrice:{
        type: String,
        required:true
    },
});
module.exports = mongoose.model('Bid',BidSchema);