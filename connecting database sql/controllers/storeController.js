const Favorite = require("../models/fav")
const home = require("../models/home")

exports.getIndex = (req, res) => {
    res.render('store/index', {pageTitle: 'Hotel pk', activePage: 'home' })
}

exports.gethomeAdd = (req,res)=>{
    res.render('store/index',{pageTitle:'Hotel pk',activePage:'home'})
}
exports.getHomeList = (req,res)=>{
    home.fetchAll().then(([registerHome])=>{
        res.render('store/homeList',{
            booking:registerHome,
            pageTitle:'Home List',
            activePage:'homeList'
        })
    })
    .catch(err=>{
        res.redirect('/')
    })
}
exports.getFavoriteList = (req,res)=>{
    Favorite.getFavorites (fav=>{
        home.fetchAll()(([registerHome])=>{
            const favHomes = registerHome.filter(home => fav.includes(home.id))
            res.render('store/favorite',{
                booking:favHomes,
                pageTitle:'Favorite List',
                activePage:'favorite'
            })
        }).catch(err=>{
            res.redirect('/')
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
exports.postremoveFav = (req,res)=>{
    const homeID = req.params.homeId;
    console.log("your current home",homeID);
    Favorite.removeFav(homeID,(err)=>{
        if(err){
            console.log("couldn't remove your fav home");
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
    home.findById(homeId).then(([homes])=>{
        const home = homes[0]
        if(!home){
            res.redirect('/homelist')
        }else{
            console.log('your home details:',home);
            res.render('store/homeDetails', { pageTitle: 'Home Detail', activePage: 'homeList',home })
        }
    })
}