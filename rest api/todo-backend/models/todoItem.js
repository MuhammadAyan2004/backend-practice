const { default: mongoose } = require("mongoose");

const todoList = new mongoose.Schema({
    task: {type:String,required:true},
    completed:{type:Boolean, default:false},
    Timestamp:{type:Date, default: Date.now}
});


module.exports = mongoose.model('todo',todoList)