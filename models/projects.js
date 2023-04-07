const mongoose=require('mongoose')
const projectSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    issuesList:[{type : mongoose.Types.ObjectId,ref:'Issue'}],
    
    
},{timestamps:true})

const Project=mongoose.model('Project',projectSchema)

module.exports=Project