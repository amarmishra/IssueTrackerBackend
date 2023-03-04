module.exports.signInPage=function (req,res){
    if(req.isAuthenticated()){
        return res.redirect('/projects/')
    }
    return res.render('sign_in')
}
module.exports.redirectToProjectPage=(req,res)=>{
   return res.redirect('/projects')
}