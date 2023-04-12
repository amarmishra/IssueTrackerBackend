require('dotenv').config()

const mongoose=require('mongoose')
mongoose.set('strictQuery', true);

let db;

mongoose.connect(process.env.MONGODB_SERVER_URL).then(()=>{

    db=mongoose.connection;

    db.on('error',(err)=>{
        console.error.bind('Error:after connection',err)
    })
    
    db.once('open',()=>{
        console.log("Successfully connected to the database")
    })

    module.exports=db
        
}).catch((err)=>{ console.log("Error while making initial connection::",err)})
   


