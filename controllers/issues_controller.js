const Issue = require('../models/issues')
const Project = require('../models/projects')
const Label = require('../models/labels')


module.exports.createIssue= async (req,res)=>{

    let labels=[]; 

    if(req.body.choosenLabelArray && req.body.choosenLabelArray.length!==0){
        req.body.choosenLabelArray.forEach((label)=>{
            labels.push(label.id)
        })
    }

    


    try{
        //create new Issue doc in Issue collection

        let newIssue=await Issue.create({
            title: req.body.title,
            description:req.body.description,
            author:req.body.author,
            labels:labels,
            project:req.params.projectId
        })

        if(req.body.newLabelArray && req.body.newLabelArray.length!==0){
            req.body.newLabelArray.forEach(async (label)=>{
                
                //search for label in the database
                let search=await Label.find()
                                        .where('name')
                                        .regex(new RegExp('^'+label, "i"))
                                        .exec()

                if(!(search && search.length!==0)){
                    
               
                    let newLabel=await Label.create({
                        name:label
                    })
                    newIssue.labels.push(newLabel._id)
                    await newIssue.save()
                }                        
                
            })
        }



     
        

        let project=await Project.findById(req.params.projectId)
        project.issuesList.push(newIssue._id);
        await project.save()

      
        return res.status(200).json({success:true})
    }
    catch(error){
        console.log("Error while adding new label or adding issue to the project list",error)
        //depending on the error send res.status
        return res.status(200).json({success:false})  //Internal Error
    }
    
}


module.exports.filterIssues=async (req,res)=>{

    let {author,title,labelIdArray}=req.body

    
   let issuesList=[];

      //tag filter
   if(labelIdArray){
        
       issuesList=await Issue.find().where({project:req.params.projectId,labels:{ $all:labelIdArray} })
        .populate({
            path:'labels',
        }).exec();
    }
    else{
        issuesList=await Issue.find().where({project:req.params.projectId})
        .populate({
            path:'labels',
        }).exec();
    }

 
    //author filter
    if(author){
        
        issuesList= issuesList.filter((issue)=> issue.author.toLowerCase().includes(author.toLowerCase()))
    }
  
    
    //title filter 
    if(title){
        
        issuesList= issuesList.filter((issue)=> issue.title.toLowerCase().includes(title.toLowerCase()) || issue.description.toLowerCase().includes(title.toLowerCase()) )
    }
    
    return res.status(200).json({success:true,data:issuesList})
   
}

module.exports.clearFilters=(req,res)=>{
    res.redirect(`/projects/${req.params.projectId}`)
}