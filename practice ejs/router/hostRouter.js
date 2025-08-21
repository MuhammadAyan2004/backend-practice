const express = require('express')
const hostRouter = express.Router()

hostRouter.get('/Addhome.ejs',(req,res)=>{
    res.render('Addhome',{pageTitle:'Add Home',activePage:'AddHome'})
})

const booking = [] 
hostRouter.post('/homeRegister.ejs',(req,res)=>{
    booking.push(req.body)
    res.render('homeRegister', {pageTitle:'Registration Successful',activePage:'AddHome'})
})

exports.hostRouter = hostRouter;
exports.booking = booking;