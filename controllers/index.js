module.exports.signInPage=function (req,res){
    if(req.isAuthenticated()){
        return res.redirect('/projects/')
    }
    return res.render('sign_in')
}
module.exports.signUpPage=function (req,res){
    if(req.isAuthenticated()){
        return res.redirect('/projects/')
    }
    return res.render('sign_up')
}
module.exports.redirectToProjectPage=(req,res)=>{
   return res.redirect('/projects')
}