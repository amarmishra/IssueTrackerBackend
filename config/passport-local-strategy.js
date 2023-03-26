const passport = require("passport");
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/users')



//local authentication strategy used for login for the firest time
passport.use(new LocalStrategy(
    {usernameField: 'email'},
      function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
          
         if (err) { return done(err); }
          
          if (!user || user.password!==password) {
            return done(null, false, { message: 'Unknown user' });
          }
     
          return done(null, user);
  
        });
      }
  ));

    
  
  passport.checkAuthentication=(req,res,next)=>{
        if(req.isAuthenticated()){
            return next()
        }
        return res.redirect('/users/sign-in')
    }
    
  passport.setAuthenticatedUser=function (req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user
        return next()
    }
    return next()
  }

  passport.serializeUser((user,done)=>{
    return done(null,user.id)
  })

  passport.deserializeUser(async (id,done)=>{
    try{
        let user=await User.findById(id)
        done(null,user)
    } 
    catch(err){
        done(err)
    }
     
  })

  module.exports=passport