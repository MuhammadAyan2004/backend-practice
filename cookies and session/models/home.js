const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');



const homeScheme = new mongoose.Schema({
    houseName: {type:String,required:true},
    price: {type:Number,required:true},
    location: {type:String,required:true},
    rating: {type:Number,required:true},
    photoUrl: String,
    description: String,
})


module.exports = mongoose.model('home',homeScheme)



