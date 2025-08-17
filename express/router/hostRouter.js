const express = require('express')
const path = require('path')
const hostRouter = express.Router()
const rootDir = require('../utils/path')

hostRouter.get('/add-home',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','addhome.html'))
})
hostRouter.post('/add-home',(req,res,next)=>{
    console.log(req.body);  
    res.sendFile(path.join(rootDir,'views','homeAdded.html'))
})

module.exports = hostRouter;