const home = require('../models/home')

exports.getAddHome = (req, res) => {
    res.render('host/Addhome', {
        pageTitle: 'Add Home', 
        activePage: 'AddHome',
        editing: false
    })
}
exports.getEditHome = (req, res) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
    home.findById(homeId,(hom)=>{
        if(!hom){
            console.log("home not found!");
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

exports.getHomeAdded = (req, res) => {
    home.fetchAll(registerHome => {
        res.render('host/homeAdded', {
            booking: registerHome,
            pageTitle: 'book homes',
            activePage: 'homeAdded'
        })
    })
}
exports.postHome = (req, res) => {
    const { userName, location, price, rating, pic } = req.body
    const registerHome = new home(userName, price, location, rating, pic)
    registerHome.save()
    res.render('host/homeRegister', {
        pageTitle: 'Registration Successful',
        activePage: 'AddHome'
    })
}
exports.postEditHome = (req, res) => {
    const {id, userName, location, price, rating, pic } = req.body
    const registerHome = new home(userName, price, location, rating, pic)
    registerHome.id = id
    registerHome.save()
    res.redirect('/host/homeAdded')
}
exports.postDeleteHome = (req, res) => {
    const homeId = req.params.homeId;
    console.log('host delete id',homeId);
    home.deletebyId(homeId,(err)=>{
        if(err){
            console.log("object has not been deleted");
        }
        res.redirect('/host/homeAdded')
    })
}
