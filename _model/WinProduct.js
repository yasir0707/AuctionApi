var mongoose = require('./conn');

var WinProductSchema = new mongoose.Schema({
  
    ProductId:{
        type: String,
        required:true
    },
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
    },
    startdate:{
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
module.exports = mongoose.model('WinProduct',WinProductSchema);