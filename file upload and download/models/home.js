const mongoose = require('mongoose');

const homeScheme = new mongoose.Schema({
    houseName: {type:String,required:true},
    price: {type:Number,required:true},
    location: {type:String,required:true},
    rating: {type:Number,required:true},
    img: String,
    description: String,
    hostHomes:{type:mongoose.Schema.Types.ObjectId}
})


module.exports = mongoose.model('home',homeScheme)
