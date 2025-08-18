const express = require('express')
// const path = require('path')     
const userRouter = express.Router()
// const rootDir = require('../utils/path')
const { registeredUser } = require('./hostRouter')

userRouter.get('/',(req,res,next)=>{
    console.log(registeredUser);
    res.render('user',{registeredUser:registeredUser, pageTitle:'Airbnb-home'})
})

module.exports = userRouter;