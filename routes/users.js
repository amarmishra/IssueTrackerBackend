const express=require('express')
const router=express.Router();
const passport=require('passport')

const {createSession,createUser,destroySession}=require('../controllers/users_controller')
const {signInPage}=require('../controllers')
router.post("/login",passport.authenticate('local',{
    failureRedirect:'/users/sign-in'
}),createSession)
router.post("/create-user",createUser)

router.get("/sign-in",signInPage)
router.get("/sign-out",destroySession)
module.exports=router