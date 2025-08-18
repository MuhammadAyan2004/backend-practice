const express = require('express')
const path = require('path')
const hostRouter = express.Router()
const rootDir = require('../utils/path')

hostRouter.get('/add-home',(req,res,next)=>{
    res.render('addhome',({pageTitle:'regestration page'}))
})
const registeredUser = []
hostRouter.post('/add-home',(req,res,next)=>{
    registeredUser.push({userhome:req.body.userHome})  
    res.render('homeAdded',({pageTitle:'regestered'}))
})

exports.hostRouter = hostRouter;
exports.registeredUser = registeredUser;