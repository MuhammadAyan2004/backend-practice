const mongoose  = require("mongoose")


const signUpSchema = new mongoose.Schema({
    firstName:{type:String, required: true},
    lastName:{type:String, required: true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required: true},
    accType:{type:String, required: true},
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'home'
    }],
})


module.exports = mongoose.model('signModel',signUpSchema);