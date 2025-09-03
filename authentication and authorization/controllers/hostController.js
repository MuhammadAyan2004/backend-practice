const home = require('../models/home')

function checkHost(req){
    return req.session.isLoggedIn && req.session.accType === 'host'
}

exports.getAddHome = (req, res) => {
    if(!checkHost(req)){
        return res.status(403).send("🚫 Access denied. Only hosts can add homes.")
    }
    res.render('host/Addhome', {
        pageTitle: 'Add Home', 
        activePage: 'AddHome',
        editing: false,
        isLoggedIn: req.session.isLoggedIn,
        state:'host'
    })
}

exports.getHomeAdded = (req, res) => {
    if(!checkHost(req)){
        return res.status(403).send("🚫 Access denied. Only hosts can add homes.")
    }
    home.find().then(registerHome => {
        console.log(registerHome);
        res.render('host/homeAdded', {
            booking: registerHome,
            pageTitle: 'book homes',
            activePage: 'homeAdded',
            isLoggedIn: req.session.isLoggedIn,
            state:'host'
        })
    }).catch(err=>{
        res.redirect('/')
    })
}
exports.postHome = (req, res) => {
    if(!checkHost(req)){
        return res.status(403).send("🚫 Access denied. Only hosts can add homes.")
    }
    const { userName, location, price, rating, pic, description } = req.body
    const registerHome = new home({houseName:userName, price, location, rating, photoUrl:pic, description})
    registerHome.save()
    res.render('host/homeRegister', {
        pageTitle: 'Registration Successful',
        activePage: 'AddHome',
        isLoggedIn: req.session.isLoggedIn,
        state:'host'
    })
}
exports.getEditHome = (req, res) => {
    if(!checkHost(req)){
        return res.status(403).send("🚫 Access denied. Only hosts can add homes.")
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
                state:'host'
            })
        }
    })
}
exports.postEditHome = (req, res) => {
    if(!checkHost(req)){
        return res.status(403).send("🚫 Access denied. Only hosts can add homes.")
    }
    const {id,houseName, location, price, rating, photoUrl, description } = req.body
    home.findByIdAndUpdate (id,{houseName,price,location,rating,photoUrl,description},{new:true})
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
    if(!checkHost(req)){
        return res.status(403).send("🚫 Access denied. Only hosts can add homes.")
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
