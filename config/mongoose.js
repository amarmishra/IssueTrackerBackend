require('dotenv').config()

const mongoose=require('mongoose')
mongoose.set('strictQuery', true);

let db;

mongoose.connect(process.env.MONGODB_SERVER_URL,{dbName:process.env.MONGODB_DATABASE_NAME}).then(()=>{

    db=mongoose.connection;

    db.on('error',(err)=>{
        console.error.bind('Error:after connection',err)
    })
    
    db.once('open',()=>{
        console.log("Successfully connected to the database")
    })


        
}).catch((err)=>{ console.log("Error while making initial connection::",err)})
   


