const mongoose=require('mongoose')
const issueSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    labels:[{
        type : mongoose.Types.ObjectId,
        ref:'Label'
    }],   
    author:{
        type:String,
        required:true
    },
    project:{
        type:mongoose.Types.ObjectId,
        ref:'Project'
    } 
    
},{timestamps:true})

const Issue=mongoose.model('Issue',issueSchema)

module.exports=Issue