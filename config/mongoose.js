require('dotenv').config()

const mongoose=require('mongoose')
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_SERVER_URL,{dbName:process.env.MONGODB_DATABASE_NAME})

const db=mongoose.connection
db.on('error',(err)=>{
    console.error.bind('Error:after connection',err)
})

db.once('open',()=>{
    console.log("Successfully connected to the database")
})

module.exports=db

   

        

   


