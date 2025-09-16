const express = require('express')

const todoItemController = require('../controllers/todoItemController')
const todoRouter = express.Router()


todoRouter.post('/',todoItemController.postTodo)

module.exports = todoRouter