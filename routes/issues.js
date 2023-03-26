const express=require('express')
const router=express.Router();


const {createIssue,filterIssues,clearFilters}=require('../controllers/issues_controller')
router.post('/create/:projectId',createIssue)
router.post('/filter/:projectId',filterIssues)
router.get('/clearFilter/:projectId',clearFilters)
module.exports=router