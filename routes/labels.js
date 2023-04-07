const {Router}=require('express')
const router=Router();

const { addLabelDataToSession}=require('../middlewares/labels')
const {suggestLabels,suggestLabelsInProject}=require('../controllers/labels_controllers')
//post request to suggest label
router.post('/suggestLabels',suggestLabels)
router.get('/suggestLabels/:id',suggestLabelsInProject)
router.post('/addLabelsToSession',addLabelDataToSession)

module.exports=router