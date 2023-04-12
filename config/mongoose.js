require('dotenv').config()

const mongoose=require('mongoose')
mongoose.set('strictQuery', true);

let db;
// Connecting to the database
const connect = async function () {
    return mongoose.connect(process.env.MONGODB_SERVER_URL,{useNewUrlParser: true, useUnifiedTopology: true,dbName:process.env.MONGODB_DATABASE_NAME})
  };


(async ()=>{
    try{
        await connect()

        db=mongoose.connection
        db.on('error',(err)=>{
            console.error.bind('Error:after connection',err)
        })
        
        db.once('open',()=>{
            console.log("Successfully connected to the database")
        })
    
    }
    catch(err){
        console.log("Error while making initial connection::",err)
    }
})()

module.exports=db
   

        

   


