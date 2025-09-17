const express = require('express')

const todoItemController = require('../controllers/todoItemController')
const todoRouter = express.Router()


todoRouter.get('/',todoItemController.getTodo)
todoRouter.post('/',todoItemController.postTodo)
todoRouter.delete('/:id',todoItemController.deleteTodo)

module.exports = todoRouter