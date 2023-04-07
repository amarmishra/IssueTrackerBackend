const Label=require('../models/labels')
const Project = require('../models/projects')

async function suggestLabels(req,res){
    
    const {queryString}=req.body
    // console.log("Recieved request for prefix",queryString)

    const labels=await Label.find()
                        .where('name')
                        .regex(new RegExp('^'+queryString, "i"))
                        .exec()

    if(labels && labels.length!==0){
        //console.log(labels)
        return res.status(200).json({ success:true,data: labels})
    }

   
   
    return res.status(200).json({success:false})
    
}
async function suggestLabelsInProject(req,res){
    
    //returns all labels attatched to the project as JSON


  
    const projectId=req.params.id

    const projectDetails=await Project.findById(projectId)
                        .populate({
                            path:'issuesList',
                            populate:{
                                path:'labels',
                            }
                        }).exec()
                       
                        
    
    const labels=[]
    projectDetails.issuesList.forEach((issue)=>{
        if(issue.labels){
           issue.labels.forEach((label)=>{
            if(!labels.includes(label)){
                labels.push(label)
            }
            
           }) 
        }
    })

    

    if(labels.length!==0){
        //console.log(labels)
        return res.status(200).json({ success:true,data: labels})
    }

   
    return res.status(200).json({success:false})
    
}


module.exports={suggestLabels,suggestLabelsInProject}