var mongoose = require('./conn');

var ProductSchema = new mongoose.Schema({
  
    
    CategoryId:{
        type: String,
        required:true
    },
    SubcategoryId:{
        type: String,
        required:true
    },
    ProductName:{
        type: String,
        required:true
    },
    ProductImage:{
        type: String,
        required:true
    },
    ProductTitle:{
        type: String,
        required:true
    },
    ProductDesc:{
        type: String,
        required:true
    },
    ProductPrice:{
        type: String,
        required:true
    },
    Quantity:{
        type: String,
        required:true
    },
    CarretQuantity:{
        type: Number,
        required:true
    },
    Time:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('product',ProductSchema);