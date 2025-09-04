exports.PageNotFound = (req,res)=>{
    res.status(404).render('404',{pageTitle:'404 page',isLoggedIn: true,user: req.session.user})
}