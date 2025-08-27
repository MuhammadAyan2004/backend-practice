const home = require('../models/home')

exports.getAddHome = (req, res) => {
    res.render('host/Addhome', {
        pageTitle: 'Add Home', 
        activePage: 'AddHome',
        editing: false
    })
}

exports.getHomeAdded = (req, res) => {
    home.fetchAll().then(([registerHome]) => {
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
    const registerHome = new home(userName, price, location, rating, pic, description)
    registerHome.save()
    res.render('host/homeRegister', {
        pageTitle: 'Registration Successful',
        activePage: 'AddHome'
    })
}
exports.getEditHome = (req, res) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    home.findById(homeId).then(([homes])=>{
        const hom = homes[0]
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
    const {id, userName, location, price, rating, pic, description } = req.body
    const registerHome = new home(userName, price, location, rating, pic, description, id)

    home.updatehome(id,registerHome)
        .then(() => {
            res.redirect('/host/homeAdded')
        })
        .catch((err) => {
            if (err) {
                console.log("object has not been deleted");
            }
        })

}

exports.postDeleteHome = (req, res) => {
    const homeId = req.params.homeId;
    home.deletebyId(homeId)
        .then(() => {
            res.redirect('/host/homeAdded')
        })
        .catch((err) => {
            if (err) {
                console.log("object has not been deleted");
            }
        })
}
