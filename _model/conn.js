var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yasir:yasir01@auction.rf5fe.mongodb.net/Auction',
    {},
    (err)=>{
        if(!err){
            console.log('connection Success')
        }
        else{
            console.log('connection failed')
        }
})
module.exports = mongoose;