var mongoose = require('./conn');

var CategorySchema = new mongoose.Schema({
  
    CategoryName:{
        type: String,
        required:true
    },
    CategoryImage:{
        type: String,
        required:true
    }
});
module.exports = mongoose.model('category',CategorySchema);