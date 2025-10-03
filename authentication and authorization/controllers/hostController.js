const home = require('../models/home')

exports.getAddHome = (req, res) => {
    if(req.session.user.accType !== 'host'){
        return res.status(403).send('🚫 Access denied. Only host can view this page.')
    }
    res.render('host/Addhome', {
        pageTitle: 'Add Home', 
        activePage: 'AddHome',
        editing: false,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    })
}

exports.postHome = async (req, res) => {
    if(req.session.user.accType !== 'host'){
        return res.status(403).send('🚫 Access denied. Only host can view this page.')
    }
    const userId = req.session.user._id;
    const { userName, location, price, rating, pic, description } = req.body
    const registerHome = new home({
        houseName:userName, 
        price, 
        location, 
        rating, 
        photoUrl:pic, 
        description,
        hostHomes:userId
    })
    registerHome.save()
    res.render('host/homeRegister', {
        pageTitle: 'Registration Successful',
        activePage: 'AddHome',
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    })
}

exports.getHomeAdded = async (req, res) => {
    if(req.session.user.accType !== 'host'){
        return res.status(403).send('🚫 Access denied. Only host can view this page.')
    }
    const userId = req.session.user._id;

    home.find({hostHomes:userId}).then(registerHome => {
        res.render('host/homeAdded', {
            booking: registerHome,
            pageTitle: 'book homes',
            activePage: 'homeAdded',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        })
    }).catch(err=>{
        res.redirect('/')
    })
}

exports.getEditHome = (req, res) => {
    if(req.session.user.accType !== 'host'){
        return res.status(403).send('🚫 Access denied. Only host can view this page.')
    }
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    home.findById(homeId).then(hom=>{
        if(!hom){
            res.redirect('/host/homeAdded')
        }else{
            res.render('host/Addhome', {
                pageTitle: 'Edit Home', 
                activePage: 'AddHome',
                editing: editing,
                hom:hom,
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            })
        }
    })
}
exports.postEditHome = (req, res) => {
    if(req.session.user.accType !== 'host'){
        return res.status(403).send('🚫 Access denied. Only host can view this page.')
    }
    const userId = req.session.user._id;
    const {id,houseName, location, price, rating, photoUrl, description } = req.body
    home.findByIdAndUpdate (id,{houseName,price,location,rating,photoUrl,description,hostHomes:userId},{new:true})
    .then((updatedHome)=>{
        if(!updatedHome){
            console.log('home not found');
            return res.redirect('/host/homeAdded')
        }else{
            return res.redirect('/host/homeAdded')
        }
    })
    .catch(err=>{
        console.log('there is some err:',err);
    })
}

exports.postDeleteHome = (req, res) => {
    if( req.session.user.accType !== 'host'){
        return res.status(403).send('🚫 Access denied. Only host can view this page.')
    }
    const homeId = req.params.homeId;
    home.findByIdAndDelete(homeId)
        .then(() => {
            res.redirect('/host/homeAdded')
        })
        .catch((err) => {
            if (err) {
                console.log("object has not been deleted");
            }
        })
}
