const fav = require("../models/fav")
const home = require("../models/home")

exports.getIndex = (req, res) => {
    res.render('store/index', {
        pageTitle: 'Hotel pk', 
        activePage: 'home',
        isLoggedIn: req.session.isLoggedIn,
        state:req.session.accType||{}
    })
}

exports.gethomeAdd = (req,res)=>{
    res.render('store/index',{
        pageTitle:'Hotel pk',
        activePage:'home',
        isLoggedIn: req.session.isLoggedIn,
        state:req.session.accType||{}
    })
}
exports.getHomeList = (req,res)=>{
    if(req.session.accType !== 'user'){
        return res.status(403).send("🚫 Access denied. Only users can view this page.")
    }
    home.find().then(registerHome=>{
        res.render('store/homeList',{
            booking:registerHome,
            pageTitle:'Home List',
            activePage:'homeList',
            isLoggedIn: req.session.isLoggedIn,
            state:'user'
        })
    })
    .catch(err=>{
        res.redirect('/')
    })
}
exports.getHomeDetail = (req,res)=>{
    if(req.session.accType !== 'user'){
        return res.status(403).send("🚫 Access denied. Only users can view this page.")
    }
    const homeId = req.params.homeId;
    home.findById(homeId)
    .then(home=>{
        if(!home){
            res.redirect('/homelist')
        }else{
            console.log('your home details:',home);
            res.render('store/homeDetails', { 
                pageTitle: 'Home Detail', 
                activePage: 'homeList',
                home,
                isLoggedIn: req.session.isLoggedIn,
                state:'user'
            })
        }
    })
    .catch(err=>{
        console.log("fetching details error:" , err);
    })
}
exports.getFavoriteList = (req,res)=>{
    if(req.session.accType !== 'user'){
        return res.status(403).send("🚫 Access denied. Only users can view this page.")
    }
    fav.find().populate('_id')
        .then(fav=>{
            res.render('store/favorite',
                {
                    booking:fav,
                    pageTitle:'Favorite List',
                    activePage:'favorite',
                    isLoggedIn: req.session.isLoggedIn,
                    state:'user'
                })
        }).catch(err =>{
            console.log(err);
            res.redirect('/homeList')
        })
}

exports.postFavoriteList = (req,res)=>{
    if(req.session.accType !== 'user'){
        return res.status(403).send("🚫 Access denied. Only users can view this page.")
    }
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
    if(req.session.accType !== 'user'){
        return res.status(403).send("🚫 Access denied. Only users can view this page.")
    }
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
    if(req.session.accType !== 'user'){
        return res.status(403).send("🚫 Access denied. Only users can view this page.")
    }
    res.render('store/bookings',{
            pageTitle:'Bookings',
            activePage:'booking',
            isLoggedIn: req.session.isLoggedIn,
            state:'user'
        })
}

