


exports.basicAuth=function (req,res,next){
    if(true){
        //procced to projects page if cookie consists of token
        //verify cookie token with server or decode jwt token ----> proceed 
        return res.redirect('/projects')
    }
    else{
        //go to signin / signup page
        next()
    }
    
}