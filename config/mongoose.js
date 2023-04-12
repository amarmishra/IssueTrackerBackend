require('dotenv').config()

const mongoose=require('mongoose')
mongoose.set('strictQuery', true);

function connectToDb(){

        return new Promise((resolve, reject) => {
                mongoose.connect(process.env.MONGODB_SERVER_URL).then(()=>{
                    db=mongoose.connection;
                    db.on('error',(err)=>{
                        console.error.bind(console,'An error occured while connecting database')
                    })
                    db.once('open',()=>{
                        console.log("Successfully connected to the database")
                        return resolve(db)
                    })
                    
                })
                .catch(reject)
               
            })

}



async function startServer(){
    try{
        const db=await connectToDb()
    }
    catch(err){
        console.log(err)
    }
    
}

try {
    startServer()
}
catch(err){
    console.log(err)
}