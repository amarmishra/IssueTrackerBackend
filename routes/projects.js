const express=require('express')
const router=express.Router();
const passport=require('passport')

const {homePage,createProject,projectDetailPage}=require('../controllers/projects_controller')
router.get('/',passport.checkAuthentication,homePage)
router.get(`/:id`,passport.checkAuthentication,projectDetailPage)
router.post('/create',createProject)

module.exports=router