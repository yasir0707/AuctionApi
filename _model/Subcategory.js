var mongoose = require('./conn');

var SubcategorySchema = new mongoose.Schema({
  
    
    CategoryId:{
        type: String,
        required:true
    },
    SubcategoryName:{
        type: String,
        required:true
    },
    SubcategoryImage:{
        type: String,
        required:true
    }
});
module.exports = mongoose.model('subcategory',SubcategorySchema);