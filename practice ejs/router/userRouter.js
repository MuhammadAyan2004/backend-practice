const express = require('express');
const { booking } = require('./hostRouter');
const userRouter = express.Router()

userRouter.get('/',(req,res)=>{
    res.render('home',{booking,pageTitle:'Hotel pk',activePage:'home'})
})

userRouter.get('/home.ejs',(req,res)=>{
    res.render('home',{booking,pageTitle:'Hotel pk',activePage:'home'})
})

userRouter.get('/homeAdded.ejs',(req,res)=>{
    console.log(booking);
    res.render('homeAdded',{booking,pageTitle:'homes render',activePage:'homeAdded'})
})

exports.userRouter = userRouter;