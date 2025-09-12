// const fav = require("../models/fav")

const home = require("../models/home")
const signModel = require("../models/signModel")

exports.getIndex = (req, res) => {
    res.render('store/index', {
        pageTitle: 'Hotel pk', 
        activePage: 'home',
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user 
    })
}

exports.gethomeAdd = (req,res)=>{
    res.render('store/index',{
        pageTitle:'Hotel pk',
        activePage:'home',
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    })
}
exports.getHomeList = (req,res)=>{
    home.find().then(registerHome=>{
        res.render('store/homeList',{
            booking:registerHome,
            pageTitle:'Home List',
            activePage:'homeList',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
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
            res.render('store/homeDetails', { 
                pageTitle: 'Home Detail', 
                activePage: 'homeList',
                home,
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            })
        }
    })
    .catch(err=>{
        console.log("fetching details error:" , err);
    })
}
exports.getFavoriteList = async (req,res)=>{
    const userId = req.session.user._id
    const user = await signModel.findById(userId).populate('favorites')
    console.log(user.favorites); 
    res.render('store/favorite',{
                    booking:user.favorites,
                    pageTitle:'Favorite List',
                    activePage:'favorite',
                    isLoggedIn: req.session.isLoggedIn,
                    user: req.session.user
                })
}

exports.postFavoriteList = async (req,res)=>{
    const homeID = req.body.id
    const userId = req.session.user._id
    const user = await signModel.findById(userId);
    if(!user.favorites.includes(homeID)){
        user.favorites.push(homeID)
        await user.save()
    }
    res.redirect('/favorite');
}
exports.postremoveFav = async (req,res)=>{
    const homeID = req.params.homeId;
    const userId = req.session.user._id;
    const user = await signModel.findById(userId)
    if(user.favorites.includes(homeID)){
        user.favorites.pull(homeID)
    }
    await user.save()
    res.redirect('/favorite')   
}

exports.getBooking = (req,res)=>{
    res.render('store/bookings',{
            pageTitle:'Bookings',
            activePage:'booking',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        })
}

exports.getHomeRules = async (req,res,next)=>{
    try{
        const homeId = req.params.homeId
        console.log("📂 Download route hit, homeId:", homeId); 

        const house = await home.findById(homeId)

        if(!house || !house.rulepdf ||!house.rulepdf.data){
            return res.status(404).send("No rules PDF found for this home");
        }
        
        res.set({
            "content-Type": house.rulepdf.contentType,
            "content-Disposition": "attachment; filename=Rules.pdf"
        })
        res.send(house.rulepdf.data)
        console.log("✅ PDF sent successfully.");
    } catch (err) {
        console.error("❌ Error fetching rules:", err);
        res.status(500).send("Could not download rules");
    }
}
