const express = require('express')
const path = require('path')
const userRouter = express.Router()
const rootDir = require('../utils/path')

userRouter.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','user.html'))
})

module.exports = userRouter;