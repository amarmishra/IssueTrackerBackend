const Issue = require('../models/issues')
const Project = require('../models/projects')


module.exports.createIssue= async (req,res)=>{

    // return res.render('home',{
    //     title: 'IssueTracker',
    //     task_categories:taskCategories,
    //     task_list:taskList,
        

    // })

    try{
        let labels
        if(req.body.labels){
           labels=req.body.labels.split(" ")
        }
        let newIssue=await Issue.create({
            title: req.body.title,
            description:req.body.description,
            author:req.body.author,
            labels:labels,
            project:req.params.projectId
        })

        let project=await Project.findById(req.params.projectId)
        project.issuesList.push(newIssue._id);
        await project.save()

        // return res.status(200).json({
        //     message:`Successfully added issue to the project`
        // })
        return res.redirect('back')
    }
    catch(error){
        console.log("Error while adding project to the list in project.js controller..line 10 with error",error)
        //depending on the error send res.status
        return res.status(500)  //Internal Error
    }
}


module.exports.filterIssues=async (req,res)=>{
    
    // console.log("project id is",req.params.projectId)

    
    let {author,title,tags}=req.body
    // author && console.log("InputAuthor",author)
    // title && console.log("InputTitle",title)
    // tags && console.log("InputTags",tags)
    
    let project=await Project.findById(req.params.projectId).populate('issuesList');
    console.log("Project found is",project)
    let {issuesList}=project
      
    //author filter
    if(author){
        let authFilteredList= issuesList.filter((issue)=> issue.author.toLowerCase().includes(author.toLowerCase()))
        if(authFilteredList){
            issuesList=authFilteredList;
        }
    }
     
    console.log("Auth filter",issuesList)
    //title filter 
    if(title){
        let titleFilteredList= issuesList.filter((issue)=> issue.title.toLowerCase().includes(title.toLowerCase()) || issue.description.toLowerCase().includes(title.toLowerCase()) )
        if(titleFilteredList){
            issuesList=titleFilteredList;
        }
    }
    console.log("Title filter",issuesList)
    //tags filter
    // if(tags){
    //     let authFilteredList= issuesList.filter((issue)=> issue.author===author)
    //     if(authFilteredList){
    //         issuesList=authFilteredList;
    //     }
    // }
    console.log("Tags filter",issuesList)
    project.issuesList=issuesList;
    
    return res.render('project_details_page',{
        project
    }) 
   
}

module.exports.clearFilters=(req,res)=>{
    res.redirect(`/projects/${req.params.projectId}`)
}