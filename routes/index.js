const express=require('express');
const passport = require('passport');
const router=express.Router();
// const {basicAuth}=require('../middlewares/users')



const { redirectToProjectPage}=require('../controllers/index')
const {homePage}=require('../controllers/projects_controller')
router.get('/',passport.checkAuthentication,redirectToProjectPage)

router.use('/projects',require('./projects'))
router.use('/issues',require('./issues'))
router.use('/users',require('./users'))

module.exports=router;