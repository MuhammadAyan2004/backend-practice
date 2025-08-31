const fav = require("../models/fav")
const home = require("../models/home")

exports.getIndex = (req, res) => {
    res.render('store/index', {pageTitle: 'Hotel pk', activePage: 'home' })
}

exports.gethomeAdd = (req,res)=>{
    res.render('store/index',{pageTitle:'Hotel pk',activePage:'home'})
}
exports.getHomeList = (req,res)=>{
    home.find().then(registerHome=>{
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
exports.getHomeDetail = (req,res)=>{
    const homeId = req.params.homeId;
    home.findById(homeId)
    .then(home=>{
        if(!home){
            res.redirect('/homelist')
        }else{
            console.log('your home details:',home);
            res.render('store/homeDetails', { pageTitle: 'Home Detail', activePage: 'homeList',home})
        }
    })
    .catch(err=>{
        console.log("fetching details error:" , err);
    })
}
exports.getFavoriteList = (req,res)=>{
    fav.find().populate('_id')
        .then(fav=>{
            res.render('store/favorite',
                {
                    booking:fav,
                    pageTitle:'Favorite List',
                    activePage:'favorite'
                })
        }).catch(err =>{
            console.log(err);
            res.redirect('/homeList')
        })
}

exports.postFavoriteList = (req,res)=>{
    const homeID = req.body.id
    fav.findById(homeID)
    .then(existingHome => {
      if (existingHome) {
        return res.redirect('/favorite');
      }
      const favs = new fav({ _id: homeID });
      return favs.save();
    })
    .then(() => {
      res.redirect('/favorite');
    })
    .catch(err => {
      console.error("Error saving favorite:", err);
      res.redirect('/homeList');
    });
}
exports.postremoveFav = (req,res)=>{
    const homeID = req.params.homeId;
    fav.findByIdAndDelete(homeID)
    .then(()=>{
        res.redirect('/favorite')
    })
    .catch(err =>{
        console.log(err);
        res.redirect('/favorite')
    })
}

exports.getBooking = (req,res)=>{
    res.render('store/bookings',{
            pageTitle:'Bookings',
            activePage:'booking'
        })
}

