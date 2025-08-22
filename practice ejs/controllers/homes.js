const home = require("../models/home")
// store side router
exports.getIndex = (req, res) => {
    res.render('store/index', {pageTitle: 'Hotel pk', activePage: 'home' })
}

exports.gethomeAdd = (req,res)=>{
    res.render('store/index',{pageTitle:'Hotel pk',activePage:'home'})
}
exports.getHomeList = (req,res)=>{
    home.fetchAll((registerHome)=>{
        res.render('store/homeList',{
            booking:registerHome,
            pageTitle:'Home List',
            activePage:'homeList'
        })
    })
}
exports.getFavoriteList = (req,res)=>{
    home.fetchAll((registerHome)=>{
        res.render('store/favorite',{
            booking:registerHome,
            pageTitle:'Favorite Home',
            activePage:'favorite'
        })
    })
}
exports.getBooking = (req,res)=>{
        res.render('store/bookings',{
            pageTitle:'Bookings',
            activePage:'booking'
        })
}
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
