const home = require('../models/home')

exports.getAddHome = (req, res) => {
    res.render('host/Addhome', {
        pageTitle: 'Add Home', 
        activePage: 'AddHome',
        editing: false
    })
}

exports.getHomeAdded = (req, res) => {
    home.find().then(registerHome => {
        console.log(registerHome);
        res.render('host/homeAdded', {
            booking: registerHome,
            pageTitle: 'book homes',
            activePage: 'homeAdded'
        })
    }).catch(err=>{
        res.redirect('/')
    })
}
exports.postHome = (req, res) => {
    const { userName, location, price, rating, pic, description } = req.body
    const registerHome = new home({houseName:userName, price, location, rating, photoUrl:pic, description})
    registerHome.save()
    res.render('host/homeRegister', {
        pageTitle: 'Registration Successful',
        activePage: 'AddHome'
    })
}
exports.getEditHome = (req, res) => {
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
                hom:hom
            })
        }
    })
}
exports.postEditHome = (req, res) => {
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
