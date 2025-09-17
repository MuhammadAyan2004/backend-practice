const todoItem = require("../models/todoItem");

exports.postTodo = async (req,res)=>{
    console.log(req.body);
    const {task} = req.body
    const todos = new todoItem({task})
    await todos.save()
    res.status(201).json(todos)
}

exports.getTodo = async (req,res)=>{
    const yourTodo = await todoItem.find()
    res.json(yourTodo)
}
exports.deleteTodo = async (req,res)=>{
    const {id} = req.params
    await todoItem.findByIdAndDelete(id)
    res.json({ message: "Deleted successfully" });
}

