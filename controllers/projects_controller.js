const Project = require('../models/projects')
const mongoose=require('mongoose')
const Issue = require('../models/issues')




const homePage=async (req,res)=>{
       
        try{
            
            let projectList=await Project.find({})
                    .sort()

            return res.render('projects',{
                title: 'IssueTracker',
                projectList
        
            })

        }
            catch(error){
                console.log("Error while pulling project list in home.js controller")
                return res.sendStatus(500).end();
            }
    }
   
    
  
    

   



const sendDescription=async (req,res)=>{
    if(req.xhr){
        try{

            let description=await Project.findById(req.query.id)
                            .select('description')
        

            return res.status(200).json({
                data: description
            })
        }
        catch(error){
            console.log("Error while retrieving descrition of project in the file project.js controller..",error)
            //depending on the error send res.status
            return res.status(500)  //Internal Error
        }
    }
}

const createProject=async (req,res)=>{

    // if(req.xhr){
        console.log('Request to create new project with values',req.body)
        
    // }
    try{
        let newProject=
        await Project.create({
            name: req.body.name,
            description:req.body.description,
            author:req.body.author,
            issuesList:[]
        })
       

        // res.status(200).json({
        //     message:`Successfully added project ${newProject} to the backend`
        // })
        return res.redirect(`/projects/${newProject.id}`)
    }
    catch(error){
        console.log("Error while creating project  (project_controller.js) with error:",error)
        //depending on the error send res.status
        return res.status(500)  //Internal Error
        
    }
    

    
}
const projectDetailPage=async(req,res)=>
{
    try{
        let project=await Project.findById(req.params.id).populate('issuesList');
        
        res.render('project_details_page',{
            project
        })
    }catch(err){
        console.log(`Error:${err}`);
        res.sendStatus(500).end();
    } 
}
module.exports= {createProject,sendDescription,homePage,projectDetailPage}