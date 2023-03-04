const User=require('../models/users')
module.exports.createSession=(req,res)=>{
    return   res.redirect('/projects')



}


module.exports.destroySession=async (req,res)=>{
    try{
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          });
    }
    catch(err){
        console.log("Cannot logout with error",err)
        return res.redirect('back')
    }
  
}
module.exports.createUser=async (req,res)=>{
    try{
        await User.create(req.body)
        console.log("user created successfully")
        return res.redirect('/users/login')

    }
    catch(err){
        console.log(`Error:${err}`)
        return res.sendStatus(500).end("Failed to create user")
    }

}