const home = require("../models/home")

exports.getHomeAdded = (req,res)=>{
    home.fetchAll((registerHome)=>{
        res.render('host/homeAdded',{
            booking:registerHome,
            pageTitle:'book homes',
            activePage:'homeAdded'
        })
    })
}

exports.getAddHome = (req,res)=>{
    res.render('host/Addhome',{pageTitle:'Add Home',activePage:'AddHome'})
}
exports.postHome = (req,res)=>{
    const {userName, location, price, rating, pic } = req.body
    const registerHome = new home(userName,price,location,rating,pic)
    registerHome.save()
    res.render('host/homeRegister', {pageTitle:'Registration Successful',activePage:'AddHome'})
}
