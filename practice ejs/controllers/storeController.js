const Favorite = require("../models/fav")
const home = require("../models/home")

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
    Favorite.getFavorites (fav=>{
        home.fetchAll((registerHome)=>{
            const favHomes = registerHome.filter(home => fav.includes(home.id))
            res.render('store/favorite',{
                booking:favHomes,
                pageTitle:'Favorite List',
                activePage:'favorite'
            })
        })
    })
}
exports.postFavoriteList = (req,res)=>{
    Favorite.addToFavorite(req.body.id,(err)=>{
        if (err) {
            console.log("err while making favorite: " , err);
        }
        res.redirect('/favorite')
    })
}
exports.getBooking = (req,res)=>{
    res.render('store/bookings',{
            pageTitle:'Bookings',
            activePage:'booking'
        })
}

exports.getHomeDetail = (req,res)=>{
    const homeId = req.params.homeId;
    home.findById(homeId,home=>{
        if(!home){
            res.redirect('/homelist')
        }else{
            console.log('your home details:',home);
            res.render('store/homeDetails', { pageTitle: 'Home Detail', activePage: 'homeList',home })
        }
    })
}