require('dotenv').config()
const express = require("express");
const PORT=process.env.EXPRESS_SERVER_PORT_NO || 8000
const passport = require("passport");
const passportLocal=require('./config/passport-local-strategy')


// Express server and db configuration
const app=express()


const db=require('./config/mongoose')

app.use(express.static('./assets'))



const expressLayout=require('express-ejs-layouts');
app.use(expressLayout)

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.set('view engine','ejs')
app.set('views','./views')



// Setting middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit:'1mb'}))



//session management with 'express-session' and make session-data persistent with 'connect-mongo'
const session=require('express-session')
const MongoStore = require('connect-mongo');

app.use(session({
    name:'__itbe__',
    secret:'something',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge:(1000*60*30) //30min 
    },
    store: MongoStore.create({
        mongoUrl: `${process.env.MONGODB_SERVER_URL}/${process.env.MONGODB_DATABASE_NAME}`,
      })
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(passport.setAuthenticatedUser)

//middleware to add trie data structure to req.session(to make it persistent over routes)
app.use((req,res,next)=>{
    if(req.session.trie){
      return next()
    }
    req.session['trie']=require('./config/trie')
    return next()
})

//middleware that cleans 
const {cleanLabelDataFromSession}=require('./middlewares/labels')
app.use(cleanLabelDataFromSession)



app.use('/',require('./routes'))


app.listen(PORT,(err)=>{
    if(err){
        console.log(`Error:${err}`)
    }
    console.log(`Express server running on port:${PORT}`)
})