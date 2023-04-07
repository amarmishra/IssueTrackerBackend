const mongoose=require('mongoose')

const labelsSchema=new mongoose.Schema({
    name:{
        type: String,
    },
    // issues:[{type:mongoose.Types.ObjectId,ref:'Issue'}]
})

const Label=mongoose.model('Label',labelsSchema)
module.exports=Label