const Issue = require('../models/issues')
const Project = require('../models/projects')
module.exports.createIssue= async (req,res)=>{

    // return res.render('home',{
    //     title: 'IssueTracker',
    //     task_categories:taskCategories,
    //     task_list:taskList,
        

    // })

    try{
        let newIssue=
        await Issue.create({
            title: req.body.name,
            description:req.body.description,
            author:req.body.author,
            labels:req.body.labels
        })

        await Project.findById(req.params.projectId).issesList.push(newIssue._id).save()
       

        return res.status(200).json({
            message:`Successfully added issue to the project`
        })
    }
    catch(error){
        console.log("Error while adding project to the list in project.js controller..line 10 with error",error)
        //depending on the error send res.status
        return res.status(500)  //Internal Error
    }
}
