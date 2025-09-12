const home = require('../models/home')
const signModel = require('../models/signModel')

exports.getAddHome = (req, res) => {
    res.render('host/Addhome', {
        pageTitle: 'Add Home', 
        activePage: 'AddHome',
        editing: false,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    })
}

exports.postHome = async (req, res) => {
    try{
        const userId = req.session.user._id;
        const { userName, location, price, rating, description } = req.body
        
        if(!req.files.pic || !req.files.pic[0]){
            return res.status(422).send('image not found')
        }
        if(!req.files.rule || !req.files.rule[0]){
            return res.status(422).send('pdf not found')
        }

        const registerHome = new home({
            houseName:userName, 
            price, 
            location, 
            rating, 
            description,
            img:{
                data:req.files.pic[0].buffer,
                contentType:req.files.pic[0].mimetype
            }, 
            rulepdf:{
                data:req.files.rule[0].buffer,
                contentType:req.files.rule[0].mimetype
            },
            hostHomes:userId
        })
        await registerHome.save()
        res.render('host/homeRegister', {
            pageTitle: 'Registration Successful',
            activePage: 'AddHome',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        })
    } catch (err){
        console.error("❌ Error in postHome:", err);
        res.status(500).send("Something went wrong");
    }
}

exports.getHomeAdded = async (req, res) => {
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
exports.postEditHome = async (req, res) => {
    try{
        const userId = req.session.user._id;
        const {id,userName, location, price, rating, description } = req.body
    
    
        let updatedData = {
            houseName:userName,
            price,
            location,
            rating,
            description,
            hostHomes:userId
        }
    
        if(req.file && req.files.pic && req.files.pic[0]){
            updatedData.img = {
                data:req.files.pic[0].buffer,
                contentType:req.files.pic[0].mimetype
            }
        }
        if(req.file && req.files.rule && req.files.rule[0]){
            updatedData.rulepdf = {
                data:req.files.rule[0].buffer,
                contentType:req.files.rule[0].mimetype
            }
        }
    
        const updatehome = await home.findByIdAndUpdate (id,updatedData,{new:true})
        if(!updatehome){
            console.log("home not found");
        }
        return res.redirect('/host/homeAdded')
    } catch(err){
        console.log('there is some err:',err);
    }
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
