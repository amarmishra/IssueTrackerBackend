
const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/issue_tracker_backend_db')

const db=mongoose.connection;

db.on('error',()=>{
    console.error.bind(console,'An error occured while connecting database')
})

db.once('open',()=>{
    console.log("Successfully connected to the database")
})

module.exports=db