const express=require('express')
const router=express.Router();


const {createIssue}=require('../controllers/issues_controller')
router.post('/create/:projectId',createIssue)

module.exports=router