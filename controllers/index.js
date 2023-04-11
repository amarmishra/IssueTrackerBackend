const signInPage=function (req,res){
    if(req.isAuthenticated()){
        return res.redirect('/projects/')
    }
    return res.render('sign_in')
}
const signUpPage=function (req,res){
    if(req.isAuthenticated()){
        return res.redirect('/projects/')
    }
    return res.render('sign_up')
}
const redirectToProjectPage=(req,res)=>{
   return res.redirect('/projects')
}

module.exports={signInPage,signUpPage,redirectToProjectPage}