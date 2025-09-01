exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'login', 
        activePage: 'login',
        isLoggedIn: false
    })
}
exports.postLogin = (req, res) => {
    console.log(req.body);
    req.session.isLoggedIn = true
    // res.cookie('isLoggedIn' , true)
    res.redirect('/')
}
exports.postLogout = (req, res) => {
    // res.cookie('isLoggedIn' , false)
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}
