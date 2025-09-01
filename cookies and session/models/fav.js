const mongoose = require("mongoose");

const favScheme = mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'home',
        required: true,
    }
})
module.exports = mongoose.model('fav',favScheme)
